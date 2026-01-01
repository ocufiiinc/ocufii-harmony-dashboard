import React, { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  MapContainer,
  MapHeader,
  MapWrapper,
  CloseButton,
} from "../../styles/AlertDetailMap.styled";
import moment from "moment";
import { useUser } from "../../context/UserContext";
import {
  sendAssistMessage,
  getAssistRequestStatus,
  shareRoute as shareRouteApi,
  sendMessageToVictim,
} from "../../api/DashboardApi";
import Toast from "../../utility/Toast";
import { getSafetyAlertIcon } from "../../utility/DeviceMapping";
import { getTimeDifference, formatDateTime } from "../../utility/TimeFormat";
import phonePng from "../../assets/images/phone.png";
import safetyCardPng from "../../assets/images/safety_card.png";

// You'll need to set your Mapbox token
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FqYWFkLWNoYXVkcnkiLCJhIjoiY21qMnVwejFqMHdhOTNlcXdtd3Q5MnMxaiJ9.d4T-xn9cHbHM2KeOTTlGtA";

const AlertDetailMap = ({
  alerts,
  onClose,
  category,
  selectedAlert,
  showRecipients,
  showEmergencyServices,
  isLoadingRecipients,
  onUpdateRecipientStatus,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { user } = useUser();
  const recipientEventIdsRef = useRef({});
  const fetchedServicesRef = useRef(new Set()); // Track fetched alert IDs to prevent duplicate API calls
  const displayedRecipientsRef = useRef(null); // Track if recipients have been displayed for this alert
  const addressCache = useRef({}); // Cache for geocoded addresses
  const recipientPopupsRef = useRef({}); // Store popup references by email
  const [shouldPollStatus, setShouldPollStatus] = React.useState(false);
  const previousAssistStatusRef = useRef(null); // Track previous assist status data
  const previousAlertsRef = useRef(null); // Track previous alerts data
  const previousSelectedAlertIdRef = useRef(null); // Track previous selected alert ID

  // LocalStorage key for assist message responses
  const ASSIST_MESSAGES_KEY = "ocufii_assist_messages";

  // TanStack Query for polling assist request status
  const { data: assistStatusData } = useQuery({
    queryKey: ["assistRequestStatus", selectedAlert?.id],
    queryFn: () => {
      console.log("Polling assist request status for:", selectedAlert?.id);
      return getAssistRequestStatus(selectedAlert?.id);
    },
    enabled: shouldPollStatus && !!selectedAlert?.id,
    refetchInterval: shouldPollStatus ? 30000 : false,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  // Save assist message API response to localStorage
  const saveAssistMessageResponse = (notificationId, helperEmail, response) => {
    try {
      const stored = localStorage.getItem(ASSIST_MESSAGES_KEY);
      const assistMessages = stored ? JSON.parse(stored) : {};

      if (!assistMessages[notificationId]) {
        assistMessages[notificationId] = {};
      }

      assistMessages[notificationId][helperEmail] = {
        ...response,
        assistStatus: "Pending", // Add assist status field
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(ASSIST_MESSAGES_KEY, JSON.stringify(assistMessages));
      console.log("Saved assist message response to localStorage:", {
        notificationId,
        helperEmail,
        response,
      });
    } catch (error) {
      console.error("Error saving assist message response:", error);
    }
  };

  // Get assist message response from localStorage
  const getAssistMessageResponse = (notificationId, helperEmail) => {
    try {
      const stored = localStorage.getItem(ASSIST_MESSAGES_KEY);
      if (!stored) return null;

      const assistMessages = JSON.parse(stored);
      return assistMessages[notificationId]?.[helperEmail] || null;
    } catch (error) {
      console.error("Error reading assist message response:", error);
      return null;
    }
  };

  // Function to fetch address from Mapbox Geocoding API
  const getAddressFromCoordinates = async (lng, lat) => {
    const cacheKey = `${lat},${lng}`;

    // Check if address is already cached
    if (addressCache.current[cacheKey]) {
      return addressCache.current[cacheKey];
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        // Cache the address
        addressCache.current[cacheKey] = address;
        return address;
      }
      return null;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  // Restore eventIds from localStorage when recipients are loaded and check for pending requests
  useEffect(() => {
    if (
      !selectedAlert ||
      !selectedAlert.recipients ||
      selectedAlert.recipients.length === 0
    )
      return;

    let hasPendingRequests = false;

    console.log(
      "Checking localStorage for pending requests...",
      selectedAlert.recipients.length,
      "recipients"
    );

    // Check localStorage for saved eventIds for this alert
    selectedAlert.recipients.forEach((recipient) => {
      const storedResponse = getAssistMessageResponse(
        selectedAlert.id,
        recipient.email
      );

      // Check if we have a stored response with eventId (which means a message was sent)
      if (storedResponse) {
        // Extract eventId from results array or direct property
        let eventId = storedResponse.eventId;
        if (
          !eventId &&
          storedResponse.results &&
          storedResponse.results.length > 0
        ) {
          eventId = storedResponse.results[0].eventId;
        }

        if (eventId) {
          recipientEventIdsRef.current[recipient.email] = eventId;
          console.log(
            `Restored eventId for ${recipient.email} from localStorage:`,
            eventId
          );

          // If assistStatus is Pending or not yet resolved, we need to check status
          if (
            storedResponse.assistStatus === "Pending" ||
            !storedResponse.assistStatus
          ) {
            hasPendingRequests = true;
            console.log(`Found pending request for ${recipient.email}`);
          }
        }
      }
    });

    // If there are pending requests, make immediate API call and start polling
    if (hasPendingRequests) {
      console.log(
        "Found pending requests in localStorage, checking status for alert:",
        selectedAlert.id
      );

      // Make immediate API call to get current status
      getAssistRequestStatus(selectedAlert.id)
        .then((response) => {
          console.log("Initial status check response:", response);
          // The response will be handled by the assistStatusData useEffect below
          // Now start polling
          setShouldPollStatus(true);
        })
        .catch((error) => {
          console.error("Error checking assist request status:", error);
        });
    }
  }, [selectedAlert?.id, selectedAlert?.recipients?.length]);

  // Handle assist request status updates from TanStack Query
  useEffect(() => {
    if (assistStatusData && assistStatusData.requests) {
      console.log(
        "[Assist Status Update] New data received:",
        assistStatusData
      );

      // Compare with previous data to prevent duplicate processing
      const currentDataString = JSON.stringify(assistStatusData.requests);
      const previousDataString = previousAssistStatusRef.current;

      if (currentDataString === previousDataString) {
        console.log("[Assist Status Update] Data unchanged, skipping update");
        return;
      }

      console.log("[Assist Status Update] Data changed, processing updates");
      previousAssistStatusRef.current = currentDataString;

      let hasAccepted = false;

      assistStatusData.requests.forEach((recipientRequest) => {
        console.log(
          "[Button Update] Processing recipient:",
          recipientRequest.helperEmail,
          "Status:",
          recipientRequest.status
        );
        // Store the eventId for later use
        recipientEventIdsRef.current[recipientRequest.helperEmail] =
          recipientRequest.eventId;

        // Update recipient status in Dashboard state for all statuses
        if (onUpdateRecipientStatus) {
          onUpdateRecipientStatus(
            recipientRequest.helperEmail,
            recipientRequest.status
          );
        }

        // Check if any request is accepted to stop polling
        if (recipientRequest.status === "Accepted") {
          hasAccepted = true;
        }

        // Sanitize email for ID selector
        const sanitizedEmail = recipientRequest.helperEmail.replace(
          /[^a-zA-Z0-9-_]/g,
          "-"
        );

        // Update the popup with the current status
        const status = recipientRequest.status;

        // Find the recipient index from selectedAlert.recipients
        const recipientIndex = selectedAlert.recipients?.findIndex(
          (r) => r.email === recipientRequest.helperEmail
        );
        const recipientId = `${selectedAlert.id}_${recipientIndex}`;

        const statusDiv = document.getElementById(`status-${sanitizedEmail}`);
        const popupId = `popup-${selectedAlert.id}-${sanitizedEmail}`;
        const popupEl = document.querySelector(`.${popupId}`);

        if (statusDiv) {
          // Status div exists, update it
          let statusHTML = "";

          if (status === "Pending") {
            statusHTML = `
              <div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
                 Pending Response
              </div>
            `;
          } else if (status === "Accepted") {
            statusHTML = `
              <div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
                 Request Accepted
              </div>
            `;
          } else if (status === "Declined" || status === "Rejected") {
            statusHTML = `
              <div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
                 Request Declined
              </div>
            `;
          }

          statusDiv.outerHTML = statusHTML;

          // Check if route buttons already exist - if so, skip button logic entirely
          const existingRouteButtons = popupEl?.querySelector(
            `.route-buttons-${recipientId}`
          );

          console.log(
            "[Button Check] Recipient:",
            recipientRequest.helperEmail,
            "Existing buttons:",
            !!existingRouteButtons,
            "Status:",
            status
          );

          // Handle buttons based on status
          if (status === "Accepted" && !existingRouteButtons) {
            console.log(
              "[Button Insert] Adding route buttons for:",
              recipientRequest.helperEmail
            );
            // Get recipient data from selectedAlert
            const recipient = selectedAlert.recipients?.find(
              (r) => r.email === recipientRequest.helperEmail
            );

            if (recipient) {
              // Create window functions for the buttons
              window[`showRoute_${recipientId}`] = () => {
                console.log("Show Route clicked for recipient:", recipientId);
                fetchRoute(
                  selectedAlert.longitude,
                  selectedAlert.latitude,
                  recipient.longitude,
                  recipient.latitude,
                  recipientId
                );
              };

              window[`shareRoute_${recipientId}`] = () => {
                console.log("Share Route clicked for recipient:", recipientId);
                shareRoute(
                  selectedAlert.longitude,
                  selectedAlert.latitude,
                  recipient.longitude,
                  recipient.latitude,
                  recipient.email,
                  recipient.name || "Recipient"
                );
              };
            }

            // Show route buttons when accepted
            const sendMessageButton = popupEl?.querySelector(
              `button[onclick*="sendMessage_${recipientId}"]`
            );

            const routeButtonsHTML = `
              <div class="route-buttons-${recipientId}" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
                <button 
                  onclick="window['showRoute_${recipientId}']()"
                  style="padding: 10px; background: linear-gradient(135deg, #007cbf 0%, #0099ff 100%); color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
                >
                  Show Route
                </button>
                <button 
                  onclick="window['shareRoute_${recipientId}']()"
                  style="padding: 10px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
                >
                  Share Route
                </button>
              </div>
            `;

            if (sendMessageButton) {
              // Replace the send message button with route buttons
              sendMessageButton.outerHTML = routeButtonsHTML;
            } else {
              // No send message button (was in Pending state), insert route buttons after status div
              const newStatusDiv = document.getElementById(
                `status-${sanitizedEmail}`
              );
              if (newStatusDiv) {
                newStatusDiv.insertAdjacentHTML("afterend", routeButtonsHTML);
              }
            }

            // Update the popup's internal HTML so changes persist when reopened
            const popup =
              recipientPopupsRef.current[recipientRequest.helperEmail];
            if (popup && popupEl) {
              const updatedHTML = popupEl.querySelector(
                ".mapboxgl-popup-content > div"
              )?.outerHTML;
              if (updatedHTML) {
                popup.setHTML(updatedHTML);
              }
            }
          } else if (status === "Declined" || status === "Rejected") {
            // For declined, keep/show send message button, remove route buttons if they exist
            const routeButtons = popupEl?.querySelector(".action-buttons");
            if (routeButtons) {
              routeButtons.outerHTML = `
                <button 
                  onclick="window['sendMessage_${recipientId}']()"
                  style="padding: 12px; background: linear-gradient(135deg, #007cbf 0%, #0099ff 100%); color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease; margin-bottom: 8px; width: 100%;"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
                >
                  📩 Send Message
                </button>
              `;
            }
          }
        } else if (popupEl) {
          // Status div doesn't exist yet, but popup exists
          // Find the duration text paragraph and insert status after it
          const durationParagraph = popupEl.querySelector(
            'p[style*="font-weight: 450"]'
          );

          if (durationParagraph && status) {
            let statusHTML = "";

            if (status === "Pending") {
              statusHTML = `<div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">Pending Response</div>`;
            } else if (status === "Accepted") {
              statusHTML = `<div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">Request Accepted</div>`;
            } else if (status === "Declined" || status === "Rejected") {
              statusHTML = `<div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">Request Declined</div>`;
            }

            durationParagraph.insertAdjacentHTML("afterend", statusHTML);

            // Check if route buttons already exist
            const existingRouteButtons = popupEl?.querySelector(
              `.route-buttons-${recipientId}`
            );

            // Handle buttons
            if (status === "Accepted" && !existingRouteButtons) {
              console.log(
                "[Button Insert - Branch 2] Adding route buttons for:",
                recipientRequest.helperEmail
              );
              // Get recipient data from selectedAlert
              const recipient = selectedAlert.recipients?.find(
                (r) => r.email === recipientRequest.helperEmail
              );

              if (recipient) {
                // Create window functions for the buttons
                window[`showRoute_${recipientId}`] = () => {
                  console.log("Show Route clicked for recipient:", recipientId);
                  fetchRoute(
                    selectedAlert.longitude,
                    selectedAlert.latitude,
                    recipient.longitude,
                    recipient.latitude,
                    recipientId
                  );
                };

                window[`shareRoute_${recipientId}`] = () => {
                  console.log(
                    "Share Route clicked for recipient:",
                    recipientId
                  );
                  shareRoute(
                    selectedAlert.longitude,
                    selectedAlert.latitude,
                    recipient.longitude,
                    recipient.latitude,
                    recipient.email,
                    recipient.name || "Recipient"
                  );
                };
              }

              const sendMessageButton = popupEl.querySelector(
                `button[onclick*="sendMessage_${recipientId}"]`
              );

              const routeButtonsHTML = `
                <div class="route-buttons-${recipientId}" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
                  <button 
                    onclick="window['showRoute_${recipientId}']()"
                    style="padding: 10px; background: linear-gradient(135deg, #007cbf 0%, #0099ff 100%); color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
                  >
                    Show Route
                  </button>
                  <button 
                    onclick="window['shareRoute_${recipientId}']()"
                    style="padding: 10px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
                  >
                    Share Route
                  </button>
                </div>
              `;

              if (sendMessageButton) {
                // Replace the send message button with route buttons
                sendMessageButton.outerHTML = routeButtonsHTML;
              } else {
                // No send message button (was in Pending state), insert route buttons after newly created status div
                const newStatusDiv = document.getElementById(
                  `status-${sanitizedEmail}`
                );
                if (newStatusDiv) {
                  newStatusDiv.insertAdjacentHTML("afterend", routeButtonsHTML);
                }
              }
            }

            // Update the popup's internal HTML so changes persist when reopened
            const popup =
              recipientPopupsRef.current[recipientRequest.helperEmail];
            if (popup && popupEl) {
              const updatedHTML = popupEl.querySelector(
                ".mapboxgl-popup-content > div"
              )?.outerHTML;
              if (updatedHTML) {
                popup.setHTML(updatedHTML);
              }
            }
            // For Pending and Declined, Send Message button stays as is
          }
        }
      });

      // Stop polling if any request is accepted
      if (hasAccepted) {
        console.log("Status accepted, stopping polling");
        setShouldPollStatus(false);
      }
    }
  }, [assistStatusData, selectedAlert, onUpdateRecipientStatus]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  // Share route functionality
  const shareRoute = async (
    startLng,
    startLat,
    endLng,
    endLat,
    recipientEmail,
    recipientName
  ) => {
    try {
      // Get the eventId for this recipient from ref
      let eventId = recipientEventIdsRef.current[recipientEmail];

      // If not found in ref, try localStorage
      if (!eventId) {
        const storedResponse = getAssistMessageResponse(
          selectedAlert.id,
          recipientEmail
        );
        if (storedResponse && storedResponse.eventId) {
          eventId = storedResponse.eventId;
          // Also update the ref for future use
          recipientEventIdsRef.current[recipientEmail] = eventId;
          console.log("Retrieved eventId from localStorage:", eventId);
        }
      }

      // If still not found, show error
      if (!eventId) {
        Toast.error("Event ID not found. Please try again.");
        return;
      }

      // Call the share route API
      await shareRouteApi({
        notificationId: selectedAlert.id,
        eventId: eventId,
        senderEmail: user?.email,
        receiverEmail: recipientEmail,
        destinationLat: startLat.toString(),
        destinationLng: startLng.toString(),
        helperLat: endLat.toString(),
        helperLng: endLng.toString(),
      });

      // Copy route to clipboard
      const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${endLat},${endLng}&destination=${startLat},${startLng}&travelmode=driving`;

      try {
        await navigator.clipboard.writeText(routeUrl);
        Toast.success(
          `Route copied to clipboard and shared with ${recipientName}`
        );
      } catch (clipboardError) {
        console.error("Failed to copy to clipboard:", clipboardError);
        Toast.success(`Route shared with ${recipientName}`);
      }
    } catch (error) {
      console.error("Error sharing route:", error);
    }
  };

  // Show share options modal
  const showShareOptions = (url, text, recipientName) => {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: 'Decimal', sans-serif;
    `;

    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    modal.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 24px; max-width: 400px; width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 450; color: #212529;">Share Route</h3>
          <button onclick="this.closest('div[style*=fixed]').remove()" style="background: none; border: none; cursor: pointer; padding: 4px; line-height: 0;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #6c757d;">Share route to ${recipientName}</p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <button onclick="navigator.clipboard.writeText('${url}').then(() => { alert('Link copied to clipboard!'); this.closest('div[style*=fixed]').remove(); })" 
            style="padding: 12px; background: linear-gradient(135deg, #6c757d 0%, #495057 100%); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 450; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
            Copy Link
          </button>
          
          
          
          
          
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  // Fetch and display route from Mapbox Directions API
  const fetchRoute = async (
    startLng,
    startLat,
    endLng,
    endLat,
    recipientId
  ) => {
    if (!map.current) return;

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry;
        const routeId = `route-${selectedAlert.id}-${recipientId}`;

        // Remove existing dashed line if any
        if (map.current.getLayer(routeId)) {
          map.current.removeLayer(routeId);
        }
        if (map.current.getSource(routeId)) {
          map.current.removeSource(routeId);
        }

        // Remove any previous driving route for this recipient
        const drivingRouteId = `driving-route-${selectedAlert.id}-${recipientId}`;
        if (map.current.getLayer(drivingRouteId)) {
          map.current.removeLayer(drivingRouteId);
        }
        if (map.current.getSource(drivingRouteId)) {
          map.current.removeSource(drivingRouteId);
        }

        // Add the driving route
        map.current.addSource(drivingRouteId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
          },
        });

        map.current.addLayer({
          id: drivingRouteId,
          type: "line",
          source: drivingRouteId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#007cbf",
            "line-width": 4,
            "line-opacity": 0.8,
          },
        });

        // Fit map to show the route
        const coordinates = route.coordinates;
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.current.fitBounds(bounds, {
          padding: 100,
        });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Fetch nearby emergency services (hospitals, police, fire stations) within 10 miles
  const fetchNearbyServices = async (lng, lat) => {
    if (!map.current) {
      console.log("Map not ready yet");
      return;
    }

    console.log("Fetching nearby services for:", lng, lat);
    const radiusMiles = 10;

    // Array to collect all emergency service coordinates for bounds fitting
    const allServiceCoordinates = [];

    // NEW IMPLEMENTATION: Using category search API
    const categories = [
      {
        type: "hospital",
        query: "hospital",
        color: "rgba(10, 119, 67, 1)",
        icon: "H",
      },
      {
        type: "fire",
        query: "fire_station",
        color: "rgba(186, 0, 0, 1)",
        icon: "F",
      },
      {
        type: "police",
        query: "police_station",
        color: "rgba(0, 111, 201, 1)",
        icon: "P",
      },
    ];

    for (const category of categories) {
      try {
        const url = `https://api.mapbox.com/search/searchbox/v1/category/${category.query}?access_token=${mapboxgl.accessToken}&language=en&limit=10&proximity=${lng},${lat}`;

        const res = await fetch(url);
        const data = await res.json();

        console.log(`${category.type} results:`, data.features?.length || 0);

        if (data.features && data.features.length > 0) {
          // Filter by 10 miles distance
          const within10Miles = data.features.filter((f) => {
            const [poiLng, poiLat] = f.geometry.coordinates;
            const d = calculateDistance(lat, lng, poiLat, poiLng);
            return d <= 10;
          });

          console.log(
            `${category.type} within 10 miles:`,
            within10Miles.length
          );

          // Add markers for filtered results
          for (const feature of within10Miles) {
            const [featureLng, featureLat] = feature.geometry.coordinates;
            const distance = calculateDistance(
              lat,
              lng,
              featureLat,
              featureLng
            );

            console.log(`${feature.properties.name}: ${distance} miles`);

            // Collect coordinates for bounds fitting
            allServiceCoordinates.push([featureLng, featureLat]);

            // Create marker element
            const el = document.createElement("div");
            el.className = `${category.type}-marker`;
            el.style.width = "32px";
            el.style.height = "32px";
            el.style.borderRadius = "50%";
            el.style.backgroundColor = category.color;
            el.style.color = "white";
            el.style.display = "flex";
            el.style.alignItems = "center";
            el.style.justifyContent = "center";
            el.style.fontSize = "18px";
            el.style.fontWeight = "700";
            el.style.fontFamily = "'Decimal', sans-serif";
            el.style.border = "2px solid white";
            el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
            el.style.cursor = "pointer";
            el.textContent = category.icon;

            // Create unique ID for this POI
            const sanitizedId =
              feature.properties.mapbox_id?.replace(/[^a-zA-Z0-9]/g, "") ||
              Math.random().toString(36).substr(2, 9);
            const poiId = `poi_${category.type}_${sanitizedId}`;

            // Store coordinates in closure for the route function
            const alertLng = selectedAlert.longitude;
            const alertLat = selectedAlert.latitude;
            const poiLng = featureLng;
            const poiLat = featureLat;

            // Create global function for showing route to this POI
            window[`showRouteToPOI_${poiId}`] = () => {
              console.log(
                "Showing route from alert to POI:",
                alertLng,
                alertLat,
                "to",
                poiLng,
                poiLat
              );
              fetchRoute(alertLng, alertLat, poiLng, poiLat, poiId);
            };

            // Create popup with Show Route button
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="padding: 10px; font-family: 'Decimal', sans-serif; min-width: 220px;">
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 450; color: ${
                  category.color
                };">
                  ${category.icon} ${feature.properties.name || category.query}
                </h4>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #495057;">
                  ${
                    feature.properties.full_address ||
                    feature.properties.place_formatted ||
                    ""
                  }
                </p>
                <p style="margin: 0 0 10px 0; font-size: 11px; color: #6c757d; font-weight: 450;">
                  📍 ${distance} miles away
                </p>
                <button 
                  onclick="window['showRouteToPOI_${poiId}']()"
                  style="width: 100%; padding: 8px; background: linear-gradient(135deg, ${
                    category.color
                  } 0%, ${
              category.color
            }dd 100%); color: white;background-color:rgba(0, 181, 226, 1); border: none; border-radius: 6px; font-size: 12px; font-weight: 400; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
                >
                  Show Route
                </button>
              </div>
            `);

            console.log(
              `Adding ${category.type} marker at:`,
              featureLng,
              featureLat
            );

            new mapboxgl.Marker(el)
              .setLngLat([featureLng, featureLat])
              .setPopup(popup)
              .addTo(map.current);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${category.type} locations:`, error);
      }
    }

    // Fit map to show alert location and all emergency services
    if (allServiceCoordinates.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      // Add alert location to bounds
      bounds.extend([lng, lat]);
      // Add all emergency service locations to bounds
      allServiceCoordinates.forEach((coord) => bounds.extend(coord));
      // Fit the map to show all markers with padding
      map.current.fitBounds(bounds, { padding: 80 });
      console.log(
        `Fitted map to show ${allServiceCoordinates.length} emergency services`
      );
    }
  };

  // Initialize map once on mount
  useEffect(() => {
    console.log("Map initialization useEffect triggered");
    console.log("mapContainer.current:", mapContainer.current);

    if (map.current) {
      console.log("Map already initialized, skipping");
      return; // Initialize map only once
    }

    console.log("Initializing map");

    const initialView = {
      center: [-98.5795, 39.8283], // Center of USA as default
      zoom: 4,
      pitch: 0,
      bearing: 0,
    };

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: initialView.center,
      zoom: initialView.zoom,
      pitch: initialView.pitch,
      bearing: initialView.bearing,
      antialias: true, // Better rendering for 3D
      scrollZoom: true, // Enable mouse scroll zoom
      dragPan: true, // Enable click-and-drag to pan
      doubleClickZoom: true, // Enable double-click zoom
      touchZoomRotate: true, // Enable touch zoom and rotate
    });

    // Add navigation controls (zoom in/out, compass, pitch, bearing)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add geolocate control (find my location)
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right"
    );

    // Create custom Home button control
    class HomeControl {
      onAdd(map) {
        this._map = map;
        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
        this._container.innerHTML = `
          <button type="button" title="Reset to home view" style="padding: 0; width: 29px; height: 29px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        `;
        this._container.onclick = () => {
          map.flyTo({
            center: initialView.center,
            zoom: initialView.zoom,
            pitch: initialView.pitch,
            bearing: initialView.bearing,
            duration: 1500,
          });
        };
        return this._container;
      }

      onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
      }
    }

    // Create custom Pop Out Map button control
    class PopOutControl {
      onAdd(map) {
        this._map = map;
        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
        this._container.innerHTML = `
          <button type="button" title="Open map in new window" style="padding: 0; width: 29px; height: 29px; display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>
        `;
        this._container.onclick = () => {
          const center = map.getCenter();
          const zoom = map.getZoom();
          const pitch = map.getPitch();
          const bearing = map.getBearing();

          // Create URL with current map state
          const mapUrl =
            window.location.origin +
            window.location.pathname +
            `#/map?lng=${center.lng}&lat=${center.lat}&zoom=${zoom}&pitch=${pitch}&bearing=${bearing}` +
            `&alert=${selectedAlert?.id || ""}&category=${category}`;

          // Open in new window with specific dimensions
          const width = 1200;
          const height = 800;
          const left = (window.screen.width - width) / 2;
          const top = (window.screen.height - height) / 2;

          window.open(
            mapUrl,
            "MapView",
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
          );
        };
        return this._container;
      }

      onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
      }
    }

    // Add custom controls to map
    map.current.addControl(new HomeControl(), "top-right");
    map.current.addControl(new PopOutControl(), "top-right");

    // Add scale control (shows distance scale)
    map.current.addControl(
      new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: "imperial", // miles
      }),
      "bottom-right"
    );

    // Wait for map to load before adding 3D terrain and buildings
    map.current.on("load", () => {
      // Add 3D terrain
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // Add 3D buildings layer
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      map.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );

      // Original alert markers logic - using async to fetch addresses
      const createMarkersAsync = async () => {
        // Filter alerts that have coordinates
        const alertsWithCoords = alerts.filter(
          (alert) =>
            alert.latitude &&
            alert.longitude &&
            !isNaN(alert.latitude) &&
            !isNaN(alert.longitude)
        );

        for (const alert of alertsWithCoords) {
          // Fetch address from coordinates
          const address = await getAddressFromCoordinates(
            alert.longitude,
            alert.latitude
          );

          // Create a custom marker element
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.fontSize = "22px";

          // Set color based on category
          if (category === "Safety") {
            el.style.backgroundColor = "#00BCD4";
            el.style.color = "white";
          } else if (category === "Security") {
            el.style.backgroundColor = "#E91E63";
            el.style.color = "white";
          } else {
            el.style.backgroundColor = "#FFC107";
            el.style.color = "white";
          }

          el.style.border = "3px solid white";
          el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

          // Render React icon into the marker element
          const iconData = getSafetyAlertIcon(alert.notificationReason, true);
          const root = ReactDOM.createRoot(el);
          if (iconData.type === "image") {
            const img = document.createElement("img");
            img.src = iconData.src;
            img.alt = iconData.alt;
            img.style.width = "22px";
            img.style.height = "22px";
            img.style.color = "#000000";
            el.appendChild(img);
          } else {
            const IconComponent = iconData.Component;
            root.render(<IconComponent style={{ color: "#000000" }} />);
          }

          // Create popup with fetched address
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
          <div style="padding: 12px; min-width: 250px; font-family: 'Decimal', sans-serif; position: relative;">
         
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; padding-right: 24px;">
              <div style="flex: 1;">
                <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 450; color: #212529;">
                  ${alert.title}
                </h4>
                <p style="margin: 0; font-size: 11px; color: #6c757d; text-transform: uppercase;">
                  ${alert.notificationReason || "EMERGENCY"}
                </p>
                ${
                  alert.duration
                    ? `<p style="margin: 4px 0 0 0; font-size: 11px; color: #212529;">${formatDateTime(
                        alert.duration
                      )}</p>`
                    : ""
                }
              </div>
              <div style="margin-left: 12px;">
                ${
                  alert.notificationType === "11"
                    ? `<img src="${safetyCardPng}" alt="Safety Card" style="width: 24px; height: 24px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));" />`
                    : `<img src="${phonePng}" alt="Phone" style="width: 24px; height: 24px;" />`
                }
              </div>
            </div>
            ${
              alert.duration
                ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #212529;">Active for ${getTimeDifference(
                    alert.duration
                  )}</p>`
                : ""
            }
            ${
              address
                ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #495057; line-height: 1.4;">${address}</p>`
                : ""
            }
            <p style="margin: 0; font-size: 11px; color: #dc3545; font-family: monospace;">
              ${alert.latitude}, ${alert.longitude}
            </p>
          </div>
        `);

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([alert.longitude, alert.latitude])
            .setPopup(popup)
            .addTo(map.current);
        }
      };

      createMarkersAsync();

      // Fit map to show all markers or focus on selected alert
      // Filter alerts that have coordinates
      const alertsWithCoords = alerts.filter(
        (alert) =>
          alert.latitude &&
          alert.longitude &&
          !isNaN(alert.latitude) &&
          !isNaN(alert.longitude)
      );

      if (selectedAlert && selectedAlert.latitude && selectedAlert.longitude) {
        // If an alert was clicked, center on it
        map.current.flyTo({
          center: [selectedAlert.longitude, selectedAlert.latitude],
          zoom: 15,
          duration: 1000,
        });
      } else if (alertsWithCoords.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        alertsWithCoords.forEach((alert) => {
          bounds.extend([alert.longitude, alert.latitude]);
        });
        map.current.fitBounds(bounds, { padding: 50 });
      }
    });

    // Cleanup on unmount only
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Store markers in a ref so we can remove them when alerts change
  const markersRef = useRef([]);

  // Cleanup previous alert data when selectedAlert changes
  useEffect(() => {
    if (!map.current || !selectedAlert) return;

    // Only proceed if map is ready and style is loaded
    if (!map.current.isStyleLoaded()) {
      console.log("Map style not loaded yet, skipping cleanup");
      return;
    }

    console.log("Selected alert changed, cleaning up previous alert data");

    try {
      // Remove ALL existing markers (alert markers, recipient markers, service markers)
      markersRef.current.forEach((marker) => {
        if (marker && marker.remove) {
          marker.remove();
        }
      });
      markersRef.current = [];

      // Remove all alert markers from DOM
      const alertMarkers = document.querySelectorAll(".alert-marker");
      alertMarkers.forEach((marker) => {
        if (marker && marker.parentNode) {
          marker.remove();
        }
      });

      // Remove all recipient markers
      const recipientMarkers = document.querySelectorAll(".recipient-marker");
      recipientMarkers.forEach((marker) => {
        if (marker && marker.parentNode) {
          marker.remove();
        }
      });

      // Remove all emergency service markers (hospitals, police, fire stations)
      const serviceTypes = ["hospital", "police", "fire"];
      serviceTypes.forEach((type) => {
        const serviceMarkers = document.querySelectorAll(`.${type}-marker`);
        serviceMarkers.forEach((marker) => {
          if (marker && marker.parentNode) {
            marker.remove();
          }
        });
      });

      // Remove all route layers and sources
      const style = map.current.getStyle();
      if (style && style.layers) {
        const layers = [...style.layers]; // Create a copy to avoid mutation issues
        layers.forEach((layer) => {
          if (
            layer.id.startsWith("route-") ||
            layer.id.startsWith("driving-route-") ||
            layer.id.startsWith("hospital-") ||
            layer.id.startsWith("police-") ||
            layer.id.startsWith("fire-")
          ) {
            try {
              if (map.current.getLayer(layer.id)) {
                map.current.removeLayer(layer.id);
              }
            } catch (e) {
              console.warn(`Failed to remove layer ${layer.id}:`, e);
            }
          }
        });
      }

      if (style && style.sources) {
        const sources = Object.keys(style.sources);
        sources.forEach((sourceId) => {
          if (
            sourceId.startsWith("route-") ||
            sourceId.startsWith("driving-route-") ||
            sourceId.startsWith("hospital-") ||
            sourceId.startsWith("police-") ||
            sourceId.startsWith("fire-")
          ) {
            try {
              if (map.current.getSource(sourceId)) {
                map.current.removeSource(sourceId);
              }
            } catch (e) {
              console.warn(`Failed to remove source ${sourceId}:`, e);
            }
          }
        });
      }

      // Reset tracking refs for fresh start
      displayedRecipientsRef.current = null;
      fetchedServicesRef.current.clear();
      recipientEventIdsRef.current = {};
      recipientPopupsRef.current = {};

      console.log("Cleanup completed for alert:", selectedAlert.id);
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }, [selectedAlert?.id]); // Only trigger when the alert ID changes

  // Update alert markers when alerts change (without recreating the map)
  useEffect(() => {
    if (!map.current) return;

    // Compare alerts data to prevent unnecessary updates when Dashboard refetches
    const currentAlertsString = JSON.stringify(
      alerts.map((a) => ({
        id: a.id,
        latitude: a.latitude,
        longitude: a.longitude,
        title: a.title,
        duration: a.duration,
        notificationReason: a.notificationReason,
      }))
    );

    const currentSelectedAlertId = selectedAlert?.id || null;
    const alertsDataChanged = currentAlertsString !== previousAlertsRef.current;
    const selectedAlertChanged =
      currentSelectedAlertId !== previousSelectedAlertIdRef.current;

    // Skip update if neither alerts data nor selected alert changed
    if (!alertsDataChanged && !selectedAlertChanged) {
      console.log(
        "[Map Update] No changes detected, skipping marker update and map movement"
      );
      return;
    }

    if (alertsDataChanged) {
      console.log("[Map Update] Alerts data changed, updating markers");
      previousAlertsRef.current = currentAlertsString;
    }

    if (selectedAlertChanged) {
      console.log(
        "[Map Update] Selected alert changed:",
        previousSelectedAlertIdRef.current,
        "->",
        currentSelectedAlertId
      );
      previousSelectedAlertIdRef.current = currentSelectedAlertId;
    }

    const updateMarkers = () => {
      console.log("[Map Update] Updating alert markers");

      // Remove existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Filter alerts that have coordinates
      const alertsWithCoords = alerts.filter(
        (alert) =>
          alert.latitude &&
          alert.longitude &&
          !isNaN(alert.latitude) &&
          !isNaN(alert.longitude)
      );

      // If no valid coordinates, show message overlay
      if (alertsWithCoords.length === 0) {
        const existingMessage = mapContainer.current?.querySelector(
          ".no-location-message"
        );
        if (!existingMessage) {
          const noLocationMessage = document.createElement("div");
          noLocationMessage.className = "no-location-message";
          noLocationMessage.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 24px 32px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            text-align: center;
            z-index: 1000;
            font-family: 'Decimal', sans-serif;
            max-width: 400px;
          `;
          noLocationMessage.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" style="margin-bottom: 16px;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h3 style="margin: 0 0 12px 0; color: #212529; font-size: 20px; font-weight: 400;">No Location Available</h3>
            <p style="margin: 0; color: #6c757d; font-size: 14px; line-height: 1.6;">
              This alert does not have valid GPS coordinates. The location information is unavailable or incomplete.
            </p>
          `;
          mapContainer.current.appendChild(noLocationMessage);
        }
        return;
      } else {
        // Remove no location message if it exists
        const existingMessage = mapContainer.current?.querySelector(
          ".no-location-message"
        );
        if (existingMessage) {
          existingMessage.remove();
        }
      }

      // Add alert markers with async geocoding
      const createAlertMarkersAsync = async () => {
        for (const alert of alertsWithCoords) {
          // Fetch address from coordinates
          const address = await getAddressFromCoordinates(
            alert.longitude,
            alert.latitude
          );

          // Create a custom marker element
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.fontSize = "22px";

          // Set color based on category
          if (category === "Safety") {
            el.style.backgroundColor = "rgba(0, 181, 226, 1)";
          } else if (category === "Security") {
            el.style.backgroundColor = "rgba(225, 6, 0, 1)";
          } else {
            el.style.backgroundColor = "rgba(252, 196, 0, 1)";
          }

          el.style.border = "3px solid white";
          el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

          // Render React icon into the marker element
          const iconData = getSafetyAlertIcon(alert.notificationReason, true);
          const root = ReactDOM.createRoot(el);
          if (iconData.type === "image") {
            const img = document.createElement("img");
            img.src = iconData.src;
            img.alt = iconData.alt;
            img.style.width = "22px";
            img.style.height = "22px";
            el.appendChild(img);
          } else {
            const AlertIconComponent = iconData.Component;
            root.render(<AlertIconComponent style={{ color: "#000000" }} />);
          }

          // Create popup with geocoded address
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
      <div style="padding: 12px; min-width: 250px; font-family: 'Decimal', sans-serif; position: relative;">
     
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; padding-right: 24px;">
          <div style="flex: 1;">
            <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 450; color: #212529;">
              ${alert.title}
            </h4>
            <p style="margin: 0; font-size: 11px; color: #6c757d; text-transform: uppercase;">
              ${alert.notificationReason || "EMERGENCY"}
            </p>
            ${
              alert.duration
                ? `<p style="margin: 4px 0 0 0; font-size: 11px; color: #212529;">${formatDateTime(
                    alert.duration
                  )}</p>`
                : ""
            }
          </div>
          <div style="margin-left: 12px;">
            ${
              alert.notificationType === "11"
                ? `<img src="${safetyCardPng}" alt="Safety Card" style="width: 24px; height: 24px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));" />`
                : `<img src="${phonePng}" alt="Phone" style="width: 24px; height: 24px;" />`
            }
          </div>
        </div>
        ${
          alert.duration
            ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #212529;">Active for ${getTimeDifference(
                alert.duration
              )}</p>`
            : ""
        }
        ${
          address
            ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #495057; line-height: 1.4;">${address}</p>`
            : ""
        }
        <p style="margin: 0; font-size: 11px; color: #dc3545; font-family: monospace;">
          ${alert.latitude}, ${alert.longitude}
        </p>
      </div>
    `);

          // Add marker to map and store in ref
          const marker = new mapboxgl.Marker(el)
            .setLngLat([alert.longitude, alert.latitude])
            .setPopup(popup)
            .addTo(map.current);

          markersRef.current.push(marker);
        }
      };

      createAlertMarkersAsync();

      // Fit map to show all markers or focus on selected alert (smoothly)
      // Only flyTo if the selected alert actually changed
      if (
        selectedAlertChanged &&
        selectedAlert &&
        selectedAlert.latitude &&
        selectedAlert.longitude
      ) {
        // If an alert was clicked, smoothly fly to it
        console.log("[Map Update] Flying to selected alert:", selectedAlert.id);
        map.current.flyTo({
          center: [selectedAlert.longitude, selectedAlert.latitude],
          zoom: 15,
          duration: 1000,
          essential: true,
        });
      } else if (alertsDataChanged && !selectedAlert) {
        // Only fit bounds when alerts data changed and no alert is selected
        if (alertsWithCoords.length > 1) {
          const bounds = new mapboxgl.LngLatBounds();
          alertsWithCoords.forEach((alert) =>
            bounds.extend([alert.longitude, alert.latitude])
          );
          map.current.fitBounds(bounds, { padding: 80, duration: 1000 });
        } else if (alertsWithCoords.length === 1) {
          map.current.flyTo({
            center: [
              alertsWithCoords[0].longitude,
              alertsWithCoords[0].latitude,
            ],
            zoom: 12,
            duration: 1000,
            essential: true,
          });
        }
      }
    };

    // Wait for style to load if not already loaded
    if (map.current.isStyleLoaded()) {
      updateMarkers();
    } else {
      map.current.once("style.load", updateMarkers);
    }
  }, [alerts, category, selectedAlert]);

  // Note: selectedAlert camera updates are now handled in the markers useEffect above

  // Handle showRecipients changes - update map with recipient markers
  useEffect(() => {
    if (
      !map.current ||
      !showRecipients ||
      !selectedAlert ||
      !selectedAlert.recipients
    )
      return;

    // Create alert key that includes assist status to allow re-render when status changes
    const assistStatusKey = assistStatusData?.requests
      ? JSON.stringify(
          assistStatusData.requests.map((r) => ({
            email: r.helperEmail,
            status: r.status,
          }))
        )
      : "no-status";
    const alertKey = `${selectedAlert.id}_${selectedAlert.recipients.length}_${assistStatusKey}`;

    // Skip if we've already displayed recipients with this exact configuration
    if (displayedRecipientsRef.current === alertKey) {
      return;
    }
    displayedRecipientsRef.current = alertKey;

    const processRecipients = async () => {
      // Filter recipients within 10 miles and with fresh location
      const recipientsWithDistance = selectedAlert.recipients
        .filter((recipient) => recipient.isLocationFresh !== false)
        .map((recipient) => {
          const distance = calculateDistance(
            selectedAlert.latitude,
            selectedAlert.longitude,
            recipient.latitude,
            recipient.longitude
          );
          return {
            ...recipient,
            distance: parseFloat(distance),
          };
        })
        .filter((recipient) => recipient.distance <= 10);

      // Don't show error message if still loading
      // If no recipients after filtering, show message and return early
      if (recipientsWithDistance.length === 0) {
        if (!isLoadingRecipients) {
          // Show "No recipients in the area" message
          const noRecipientEl = document.createElement("div");
          noRecipientEl.className = "no-recipients-popup";
          noRecipientEl.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 1000;
            font-family: 'Decimal', sans-serif;
          `;
          noRecipientEl.innerHTML = `
          <button onclick="document.querySelector('.no-recipients-popup').remove()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; padding: 4px; line-height: 0; z-index: 10;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <svg width="64" height="64" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 16px;">
            <path d="M23.4971 32.0629C24.0827 32.0629 24.6445 32.2953 25.0586 32.7094C25.4727 33.1235 25.7061 33.6852 25.7061 34.2709C25.7061 34.8566 25.4727 35.4183 25.0586 35.8324C24.6445 36.2464 24.0827 36.4789 23.4971 36.4789C22.9115 36.4788 22.3496 36.2465 21.9355 35.8324C21.5215 35.4183 21.2891 34.8565 21.2891 34.2709C21.2891 33.6853 21.5215 33.1235 21.9355 32.7094C22.3496 32.2953 22.9115 32.063 23.4971 32.0629ZM23.4971 16.3959C23.9528 16.3959 24.3906 16.5766 24.7129 16.8988C25.0352 17.2211 25.2158 17.6588 25.2158 18.1146V26.9271C25.2158 27.383 25.0352 27.8206 24.7129 28.1429C24.3906 28.4652 23.9528 28.6459 23.4971 28.6459C23.0415 28.6458 22.6044 28.465 22.2822 28.1429C21.9599 27.8206 21.7783 27.383 21.7783 26.9271V18.1146C21.7783 17.6588 21.9599 17.2211 22.2822 16.8988C22.6044 16.5768 23.0415 16.396 23.4971 16.3959Z" fill="#F7941D" stroke="#F7941D" stroke-width="0.5"/>
            <path d="M19.1553 6.29016C21.0893 2.94632 25.9136 2.94632 27.8477 6.29016L45.4082 36.6525C47.3419 40.0003 44.9256 44.1876 41.0596 44.1876H5.94336C2.07539 44.1876 -0.338947 40.0002 1.59473 36.6525L19.1553 6.29016ZM23.502 6.97375C23.1806 6.97375 22.8645 7.05775 22.5859 7.2179C22.3073 7.37812 22.0757 7.60905 21.9141 7.88684L21.9131 7.88586L4.35547 38.2482C4.19545 38.5269 4.11108 38.8428 4.11133 39.1642C4.11165 39.4859 4.19666 39.8025 4.35742 40.0812C4.51812 40.3596 4.74923 40.5908 5.02734 40.7521C5.30565 40.9134 5.6217 40.9992 5.94336 41.0001H41.0596L41.1797 40.9952C41.4592 40.9759 41.7313 40.8931 41.9746 40.7521C42.2526 40.5909 42.4838 40.3595 42.6445 40.0812C42.8051 39.8029 42.89 39.4874 42.8906 39.1661C42.8912 38.8447 42.8072 38.5281 42.6475 38.2491L25.0889 7.88586C24.9272 7.60836 24.6954 7.37799 24.417 7.2179C24.1386 7.05785 23.8231 6.97383 23.502 6.97375Z" fill="#F7941D" stroke="#F7941D" stroke-width="0.25"/>
          </svg>
          <h3 style="margin: 0 0 16px 0; color: #000000; font-size: 18px; font-weight: 450; font-family: 'Decimal', sans-serif;">No Nearby Safety Network Members</h3>
          <div style="display: flex; justify-content: center; ">
            <p style="margin: 0 0 16px 0; color: #000000; font-size: 14px; line-height: 1.8; font-family: 'Decimal', sans-serif; max-width: 400px; text-align: center;">There are no safety network members within 10 miles or 15 minutes of travel time to assist with this emergency.</p>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="margin: 0; color: #000000; font-size: 14px; font-weight: 500; font-family: 'Decimal', sans-serif;">Send this message to the person in distress</p>
            <p style="margin: 8px 0 0 0; color: #000000; font-size: 14px; font-family: 'Decimal', sans-serif;">No Safety network members are available to assist. Please use your app to auto-dial 911 or 988 for immediate assistance.</p>
          </div>
          ${
            selectedAlert.notificationType === "11"
              ? `<button onclick="this.closest('div').remove()" style="padding: 12px 32px; background: #00BCD4; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.background='#00a5bd'" onmouseout="this.style.background='#00BCD4'">OK</button>
                `
              : `<button id="sendMessageBtn_${selectedAlert.id}" style="padding: 12px 32px; background: #00BCD4; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.background='#00a5bd'" onmouseout="this.style.background='#00BCD4'">Send Message</button>`
          }
        `;
          mapContainer.current.appendChild(noRecipientEl);

          // Add event listener for Send Message button if it's NOT a safety card (notificationType !== "11")
          if (selectedAlert.notificationType !== "11") {
            const sendMessageBtn = document.getElementById(
              `sendMessageBtn_${selectedAlert.id}`
            );
            if (sendMessageBtn) {
              sendMessageBtn.addEventListener("click", async () => {
                try {
                  // Disable button and show loading state
                  sendMessageBtn.disabled = true;
                  sendMessageBtn.textContent = "Sending...";
                  sendMessageBtn.style.opacity = "0.6";

                  // Call the sendMessageToVictim API
                  await sendMessageToVictim(user?.email, selectedAlert.id);

                  // Close the popup
                  noRecipientEl.remove();
                } catch (error) {
                  console.error("Error sending message:", error);
                  Toast.error("Failed to send message");

                  // Re-enable button
                  sendMessageBtn.disabled = false;
                  sendMessageBtn.textContent = "Send Message";
                  sendMessageBtn.style.opacity = "1";
                }
              });
            }
          }
        }
        return; // Return early, no need to call Matrix API
      }

      // Use Mapbox Matrix API to get travel times (from recipients to alert)
      const coordinates = [
        ...recipientsWithDistance.map((r) => `${r.longitude},${r.latitude}`),
        `${selectedAlert.longitude},${selectedAlert.latitude}`,
      ].join(";");

      try {
        const response = await fetch(
          `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?destinations=${recipientsWithDistance.length}&annotations=duration,distance&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (data.durations && data.durations.length > 0) {
          // Extract durations from each recipient to the alert (last column in matrix)
          const durations = data.durations.map((row) => row[row.length - 1]);

          // Add duration to recipients (ETA check commented out - only using 10 miles distance filter)
          const eligibleRecipients = recipientsWithDistance
            .map((recipient, index) => ({
              ...recipient,
              duration: durations[index], // in seconds
              durationMinutes: Math.round(durations[index] / 60),
            }))
            // .filter(
            //   (recipient) =>
            //     recipient.duration !== null && recipient.duration <= 1800
            // )
            .sort((a, b) => a.duration - b.duration); // Sort by travel time

          if (eligibleRecipients.length === 0) {
            // Show "No recipients can reach within 15 mins" message
            const noRecipientEl = document.createElement("div");
            noRecipientEl.className = "no-recipients-popup";
            noRecipientEl.style.cssText = `
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              padding: 24px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              text-align: center;
              z-index: 1000;
              font-family: 'Decimal', sans-serif;
            `;
            noRecipientEl.innerHTML = `
              <button onclick="this.closest('div').remove()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; padding: 4px; line-height: 0; z-index: 10;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <svg width="64" height="64" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 16px;">
                <path d="M23.4971 32.0629C24.0827 32.0629 24.6445 32.2953 25.0586 32.7094C25.4727 33.1235 25.7061 33.6852 25.7061 34.2709C25.7061 34.8566 25.4727 35.4183 25.0586 35.8324C24.6445 36.2464 24.0827 36.4789 23.4971 36.4789C22.9115 36.4788 22.3496 36.2465 21.9355 35.8324C21.5215 35.4183 21.2891 34.8565 21.2891 34.2709C21.2891 33.6853 21.5215 33.1235 21.9355 32.7094C22.3496 32.2953 22.9115 32.063 23.4971 32.0629ZM23.4971 16.3959C23.9528 16.3959 24.3906 16.5766 24.7129 16.8988C25.0352 17.2211 25.2158 17.6588 25.2158 18.1146V26.9271C25.2158 27.383 25.0352 27.8206 24.7129 28.1429C24.3906 28.4652 23.9528 28.6459 23.4971 28.6459C23.0415 28.6458 22.6044 28.465 22.2822 28.1429C21.9599 27.8206 21.7783 27.383 21.7783 26.9271V18.1146C21.7783 17.6588 21.9599 17.2211 22.2822 16.8988C22.6044 16.5768 23.0415 16.396 23.4971 16.3959Z" fill="#F7941D" stroke="#F7941D" stroke-width="0.5"/>
                <path d="M19.1553 6.29016C21.0893 2.94632 25.9136 2.94632 27.8477 6.29016L45.4082 36.6525C47.3419 40.0003 44.9256 44.1876 41.0596 44.1876H5.94336C2.07539 44.1876 -0.338947 40.0002 1.59473 36.6525L19.1553 6.29016ZM23.502 6.97375C23.1806 6.97375 22.8645 7.05775 22.5859 7.2179C22.3073 7.37812 22.0757 7.60905 21.9141 7.88684L21.9131 7.88586L4.35547 38.2482C4.19545 38.5269 4.11108 38.8428 4.11133 39.1642C4.11165 39.4859 4.19666 39.8025 4.35742 40.0812C4.51812 40.3596 4.74923 40.5908 5.02734 40.7521C5.30565 40.9134 5.6217 40.9992 5.94336 41.0001H41.0596L41.1797 40.9952C41.4592 40.9759 41.7313 40.8931 41.9746 40.7521C42.2526 40.5909 42.4838 40.3595 42.6445 40.0812C42.8051 39.8029 42.89 39.4874 42.8906 39.1661C42.8912 38.8447 42.8072 38.5281 42.6475 38.2491L25.0889 7.88586C24.9272 7.60836 24.6954 7.37799 24.417 7.2179C24.1386 7.05785 23.8231 6.97383 23.502 6.97375Z" fill="#F7941D" stroke="#F7941D" stroke-width="0.25"/>
              </svg>
              <h3 style="margin: 0 0 16px 0; color: #000000; font-size: 18px; font-weight: 450; font-family: 'Decimal', sans-serif;">No Nearby Safety Network Members</h3>
              <div style="display: flex; justify-content: center;">
                <p style="margin: 0 0 16px 0; color: #000000; font-size: 14px; line-height: 1.8; font-family: 'Decimal', sans-serif; max-width: 400px; text-align: center;">Safety network members are within 10 miles but none can reach the emergency location within 15 minutes of travel time.</p>
              </div>
              ${
                selectedAlert.notificationType !== "11"
                  ? `<div style="margin-bottom: 16px;">
                      <p style="margin: 0; color: #000000; font-size: 14px; font-weight: 500; font-family: 'Decimal', sans-serif;">Send this message to the person in distress</p>
                      <p style="margin: 8px 0 0 0; color: #000000; font-size: 14px; font-family: 'Decimal', sans-serif;">No safety network members can reach you within 15 minutes. Please use your app to auto-dial 911 or 988 for immediate assistance.</p>
                    </div>
                    <button id="sendEmergencyMsgBtn_${selectedAlert.id}" style="padding: 12px 32px; background: #00BCD4; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.background='#00a5bd'" onmouseout="this.style.background='#00BCD4'">Send Message</button>`
                  : `<button onclick="this.closest('div').remove()" style="padding: 12px 32px; background: #00BCD4; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;" onmouseover="this.style.background='#00a5bd'" onmouseout="this.style.background='#00BCD4'">OK</button>`
              }
            `;
            mapContainer.current.appendChild(noRecipientEl);

            // Add event listener for Send Message button
            if (selectedAlert.notificationType !== "11") {
              const sendEmergencyMsgBtn = document.getElementById(
                `sendEmergencyMsgBtn_${selectedAlert.id}`
              );
              if (sendEmergencyMsgBtn) {
                sendEmergencyMsgBtn.addEventListener("click", async () => {
                  try {
                    // Disable button and show loading state
                    sendEmergencyMsgBtn.disabled = true;
                    sendEmergencyMsgBtn.textContent = "Sending...";
                    sendEmergencyMsgBtn.style.opacity = "0.6";

                    // Call the sendMessageToVictim API
                    await sendMessageToVictim(user?.email, selectedAlert.id);

                    Toast.success("Message sent successfully");

                    // Close the popup
                    noRecipientEl.remove();
                  } catch (error) {
                    console.error("Error sending message:", error);
                    Toast.error("Failed to send message");

                    // Re-enable button
                    sendEmergencyMsgBtn.disabled = false;
                    sendEmergencyMsgBtn.textContent = "Send Message";
                    sendEmergencyMsgBtn.style.opacity = "1";
                  }
                });
              }
            }
            return;
          }

          // Display eligible recipients with numbered markers
          displayRecipients(eligibleRecipients);
        }
      } catch (error) {
        console.error("Error fetching Matrix API:", error);
        // Fallback to distance-based sorting if API fails
        const sortedRecipients = recipientsWithDistance.sort(
          (a, b) => a.distance - b.distance
        );
        displayRecipients(sortedRecipients);
      }
    };

    const displayRecipients = async (eligibleRecipients) => {
      console.log("Displaying recipients with latest assist status");

      // Remove all existing markers and layers for recipients
      if (map.current) {
        // Remove existing recipient markers (keep only alert markers)
        const existingMarkers = document.querySelectorAll(
          ".recipient-marker, .alert-marker"
        );
        existingMarkers.forEach((marker) => {
          const parent = marker.parentElement;
          if (parent && parent.classList.contains("mapboxgl-marker")) {
            parent.remove();
          }
        });

        // Remove existing route lines
        eligibleRecipients.forEach((recipient, index) => {
          const routeId = `route-${selectedAlert.id}-${recipient.id || index}`;
          if (map.current.getLayer(routeId)) {
            map.current.removeLayer(routeId);
          }
          if (map.current.getSource(routeId)) {
            map.current.removeSource(routeId);
          }
        });
      }

      // Add alert marker
      const alertEl = document.createElement("div");
      alertEl.className = "alert-marker";
      alertEl.style.width = "50px";
      alertEl.style.height = "50px";
      alertEl.style.borderRadius = "50%";
      alertEl.style.cursor = "pointer";
      alertEl.style.display = "flex";
      alertEl.style.alignItems = "center";
      alertEl.style.justifyContent = "center";
      alertEl.style.fontSize = "26px";

      // Set color based on category
      if (category === "Safety") {
        alertEl.style.backgroundColor = "#00BCD4";
        alertEl.style.color = "white";
      } else if (category === "Security") {
        alertEl.style.backgroundColor = "#E91E63";
        alertEl.style.color = "white";
      } else {
        alertEl.style.backgroundColor = "#FFC107";
        alertEl.style.color = "white";
      }

      alertEl.style.border = "4px solid white";
      alertEl.style.boxShadow = "0 4px 8px rgba(0,0,0,0.4)";
      alertEl.style.zIndex = "1000";

      const iconData = getSafetyAlertIcon(
        selectedAlert.notificationReason,
        true
      );
      const alertRoot = ReactDOM.createRoot(alertEl);
      if (iconData.type === "image") {
        const img = document.createElement("img");
        img.src = iconData.src;
        img.alt = iconData.alt;
        img.style.width = "26px";
        img.style.height = "26px";
        alertEl.appendChild(img);
      } else {
        const AlertIconComponent = iconData.Component;
        alertRoot.render(<AlertIconComponent style={{ color: "#000000" }} />);
      }

      // Fetch address for selected alert
      const selectedAlertAddress = await getAddressFromCoordinates(
        selectedAlert.longitude,
        selectedAlert.latitude
      );

      const alertPopup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div style="padding: 12px; min-width: 250px; font-family: 'Decimal', sans-serif; position: relative;">
         
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; padding-right: 24px;">
              <div style="flex: 1;">
                <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 450; color: #212529;">
                  ${selectedAlert.title}
                </h4>
                <p style="margin: 0; font-size: 11px; color: #6c757d; text-transform: uppercase;">
                  ${selectedAlert.notificationReason || "EMERGENCY"}
                </p>
                ${
                  selectedAlert.duration
                    ? `<p style="margin: 4px 0 0 0; font-size: 11px; color: #212529;">${formatDateTime(
                        selectedAlert.duration
                      )}</p>`
                    : ""
                }
              </div>
              <div style="margin-left: 12px;">
                ${
                  selectedAlert.notificationType === "11"
                    ? `<img src="${safetyCardPng}" alt="Safety Card" style="width: 24px; height: 24px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));" />`
                    : `<img src="${phonePng}" alt="Phone" style="width: 24px; height: 24px;" />`
                }
              </div>
            </div>
            ${
              selectedAlert.duration
                ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #212529;">Active for ${getTimeDifference(
                    selectedAlert.duration
                  )}</p>`
                : ""
            }
            ${
              selectedAlertAddress
                ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #495057; line-height: 1.4;">${selectedAlertAddress}</p>`
                : ""
            }
            <p style="margin: 0; font-size: 11px; color: #dc3545; font-family: monospace;">
              ${selectedAlert.latitude}, ${selectedAlert.longitude}
            </p>
          </div>
        `);

      new mapboxgl.Marker(alertEl)
        .setLngLat([selectedAlert.longitude, selectedAlert.latitude])
        .setPopup(alertPopup)
        .addTo(map.current);

      // Add recipient markers with numbers
      eligibleRecipients.forEach((recipient, index) => {
        const recipientNumber = index + 1;

        // Check if should show Send Message button (null/undefined or Declined)
        const showSendMessage =
          !recipient.assistStatus ||
          recipient.assistStatus === "Declined" ||
          recipient.assistStatus === "Rejected";

        // Check if status is Pending
        const isPending =
          recipient.assistStatus === "Pending" ||
          recipient.assistStatus === "pending";

        // Check if status is Declined/Rejected
        const isDeclined =
          recipient.assistStatus === "Declined" ||
          recipient.assistStatus === "Rejected";

        console.log(
          `Recipient ${index + 1} - Status: ${
            recipient.assistStatus
          }, showSendMessage: ${showSendMessage}, isPending: ${isPending}`
        );

        // Create global functions for buttons FIRST before setting up popup HTML
        const recipientId = `${selectedAlert.id}_${index}`;
        if (!showSendMessage && !isPending) {
          console.log(
            `Creating route buttons for recipient ${index + 1} (Status: ${
              recipient.assistStatus
            })`
          );

          window[`showRoute_${recipientId}`] = () => {
            console.log("Show Route clicked for recipient:", recipientId);
            fetchRoute(
              selectedAlert.longitude,
              selectedAlert.latitude,
              recipient.longitude,
              recipient.latitude,
              recipientId
            );
          };

          window[`shareRoute_${recipientId}`] = () => {
            console.log("Share Route clicked for recipient:", recipientId);
            shareRoute(
              selectedAlert.longitude,
              selectedAlert.latitude,
              recipient.longitude,
              recipient.latitude,
              recipient.email,
              recipient.name || "Recipient"
            );
          };
        } else {
          console.log(
            `Creating send message button for recipient ${index + 1} (Status: ${
              recipient.assistStatus
            }, showSendMessage: ${showSendMessage}, isPending: ${isPending})`
          );
          window[`sendMessage_${recipientId}`] = async () => {
            console.log("Send Message clicked for recipient:", recipientId);

            try {
              // Call the API to send assist message
              const response = await sendAssistMessage({
                email: user?.email,
                helperEmail: recipient.email,
                notificationId: selectedAlert.id,
                lat: selectedAlert.latitude.toString(),
                long: selectedAlert.longitude.toString(),
                customMessage: "Can you assist with this emergency?",
                title: "Ocufii",
                eventName: "Emergency",
              });

              // Save the API response to localStorage
              if (response) {
                saveAssistMessageResponse(
                  selectedAlert.id,
                  recipient.email,
                  response
                );
                // Also save eventId to ref if available
                if (response.eventId) {
                  recipientEventIdsRef.current[recipient.email] =
                    response.eventId;
                }
              }

              // Update the popup to show pending status
              const popupEl = document.querySelector(`.${popupId}`);
              if (popupEl) {
                const buttonContainer = popupEl.querySelector(
                  'button[onclick*="sendMessage"]'
                );
                if (buttonContainer) {
                  const sanitizedEmailForId = recipient.email.replace(
                    /[^a-zA-Z0-9-_]/g,
                    "-"
                  );
                  buttonContainer.outerHTML = `
                    <div id="status-${sanitizedEmailForId}" style="padding: 12px; background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: white; border-radius: 6px; font-size: 14px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
                       Pending Response
                    </div>
                  `;
                }
              }

              // Enable polling
              setShouldPollStatus(true);
            } catch (error) {
              console.error("Error sending message:", error);
            }
          };
        }
        console.log(`Created window functions for ${recipientId}:`, {
          showRoute: typeof window[`showRoute_${recipientId}`],
          shareRoute: typeof window[`shareRoute_${recipientId}`],
          sendMessage: typeof window[`sendMessage_${recipientId}`],
        });

        // Format location updated time
        let timeText = "";
        if (recipient.locationUpdatedTime) {
          timeText = moment
            .utc(recipient.locationUpdatedTime)
            .local()
            .format("MM/DD/YY hh:mm A");
        }

        // Create marker with number in circle
        const recipientEl = document.createElement("div");
        recipientEl.className = "recipient-marker";
        recipientEl.style.width = "40px";
        recipientEl.style.height = "40px";
        recipientEl.style.borderRadius = "50%";
        recipientEl.style.cursor = "pointer";
        recipientEl.style.display = "flex";
        recipientEl.style.alignItems = "center";
        recipientEl.style.justifyContent = "center";
        recipientEl.style.background =
          "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
        recipientEl.style.border = "3px solid white";
        recipientEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        recipientEl.style.fontSize = "18px";
        recipientEl.style.fontWeight = "700";
        recipientEl.style.color = "white";
        recipientEl.style.fontFamily = "'Decimal', sans-serif";
        recipientEl.textContent = recipientNumber;

        const durationText = recipient.durationMinutes
          ? `Time: ${recipient.durationMinutes} min away`
          : `Distance: ${recipient.distance} miles away`;

        // Start with loading address
        let address = "Fetching address...";

        // Sanitize email for use in CSS class names (remove special characters)
        const sanitizedEmail = (recipient.email || index)
          .toString()
          .replace(/[^a-zA-Z0-9-_]/g, "-");
        const popupId = `popup-${selectedAlert.id}-${sanitizedEmail}`;
        const recipientPopup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: popupId,
        });

        // Function to update popup HTML
        const updatePopupHTML = (addr) => {
          // Get current assistStatus from assistStatusData if available
          const currentStatusData = assistStatusData?.requests?.find(
            (r) => r.helperEmail === recipient.email
          );
          const currentStatus =
            currentStatusData?.status || recipient.assistStatus;

          // Recalculate flags based on current status
          const currentShowSendMessage =
            !currentStatus ||
            currentStatus === "Declined" ||
            currentStatus === "Rejected";

          const currentIsPending =
            currentStatus === "Pending" || currentStatus === "pending";

          const currentIsDeclined =
            currentStatus === "Declined" || currentStatus === "Rejected";

          console.log(
            `updatePopupHTML for recipient ${
              index + 1
            }: showSendMessage=${currentShowSendMessage}, isPending=${currentIsPending}, assistStatus=${currentStatus}`
          );
          recipientPopup.setHTML(`
          <div style="padding: 12px; min-width: 250px; font-family: 'Decimal', sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              
              <div style="flex: 1;">
                <h4 style="margin: 0; font-size: 15px; font-weight: 450; color: #212529;"><span style="color: rgba(0, 181, 226, 1);">Member: </span> ${
                  recipient.name || "Unknown"
                }</h4>
                ${
                  timeText
                    ? `<p style="margin: 2px 0 0 0; font-size: 11px; color: #6c757d;">${timeText}</p>`
                    : ""
                }
              </div>
            </div>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #28a745; font-weight: 450;">
              ${durationText}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #495057; line-height: 1.4;">${addr}</p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6c757d; font-family: monospace;">
              ${recipient.latitude.toFixed(6)}, ${recipient.longitude.toFixed(
            6
          )}
            </p>
            ${
              currentIsPending
                ? `
            <div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
               Pending Response
            </div>
            `
                : currentIsDeclined
                ? `
            <div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
               Request Declined
            </div>
            `
                : currentStatus === "Accepted"
                ? `
            <div id="status-${sanitizedEmail}" style="padding: 8px 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border-radius: 6px; font-size: 12px; font-weight: 450; text-align: center; margin-bottom: 8px; width: 100%;">
               Request Accepted
            </div>
            `
                : ""
            }
            ${
              !currentShowSendMessage && !currentIsPending
                ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
              <button 
                onclick="window['showRoute_${recipientId}']()"
                style="padding: 10px; background: linear-gradient(135deg, #007cbf 0%, #0099ff 100%); color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
              >
                Show Route
              </button>
              <button 
                onclick="window['shareRoute_${recipientId}']()"
                style="padding: 10px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; font-size: 13px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease;"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxSadow='0 2px 4px rgba(0,0,0,0.2)'"
              >
                Share Route
              </button>
            </div>
            `
                : currentShowSendMessage
                ? `
            <button 
              onclick="window['sendMessage_${recipientId}']()"
              style="padding: 12px; background: linear-gradient(135deg, #007cbf 0%, #0099ff 100%); color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 450; cursor: pointer; font-family: 'Decimal', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease; margin-bottom: 8px; width: 100%;"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.3)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.2)'"
            >
               Send Message
            </button>
            `
                : ""
            }
            
          </div>
        `);
        };

        // Set initial HTML with loading address
        updatePopupHTML(address);

        // Fetch address from Mapbox Geocoding API asynchronously
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${recipient.longitude},${recipient.latitude}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => response.json())
          .then((geocodeData) => {
            if (geocodeData.features && geocodeData.features.length > 0) {
              address = geocodeData.features[0].place_name;
              updatePopupHTML(address);
            }
          })
          .catch((error) => {
            console.error("Error fetching address:", error);
            address = "Address unavailable";
            updatePopupHTML(address);
          });

        // Store popup reference for later updates
        recipientPopupsRef.current[recipient.email] = recipientPopup;

        new mapboxgl.Marker(recipientEl)
          .setLngLat([recipient.longitude, recipient.latitude])
          .setPopup(recipientPopup)
          .addTo(map.current);
      });

      // Wait for style to load before adding route lines
      const addRouteLines = () => {
        eligibleRecipients.forEach((recipient) => {
          const routeId = `route-${selectedAlert.id}-${recipient.id}`;
          if (!map.current.getSource(routeId)) {
            map.current.addSource(routeId, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [selectedAlert.longitude, selectedAlert.latitude],
                    [recipient.longitude, recipient.latitude],
                  ],
                },
              },
            });

            map.current.addLayer({
              id: routeId,
              type: "line",
              source: routeId,
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#28a745",
                "line-width": 2,
                "line-dasharray": [2, 2],
              },
            });
          }
        });
      };

      if (map.current.isStyleLoaded()) {
        addRouteLines();
      } else {
        map.current.once("load", addRouteLines);
      }

      // Fit map to show alert and all recipients
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([selectedAlert.longitude, selectedAlert.latitude]);
      eligibleRecipients.forEach((recipient) => {
        bounds.extend([recipient.longitude, recipient.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 80 });
    };

    processRecipients();
  }, [showRecipients, selectedAlert, isLoadingRecipients, assistStatusData]);

  // Handle showEmergencyServices - fetch and display emergency services when button clicked
  useEffect(() => {
    if (!map.current || !showEmergencyServices || !selectedAlert) return;

    // Create unique key for this alert location to prevent duplicate fetches
    const locationKey = `${selectedAlert.id}_${selectedAlert.longitude}_${selectedAlert.latitude}`;

    // Check if we already fetched services for this alert
    if (fetchedServicesRef.current.has(locationKey)) {
      console.log(
        "Emergency services already fetched for this alert, skipping API call"
      );
      return;
    }

    // Mark this location as fetched
    fetchedServicesRef.current.add(locationKey);

    // Fetch and display nearby emergency services
    if (map.current.isStyleLoaded()) {
      console.log("Fetching emergency services");
      fetchNearbyServices(selectedAlert.longitude, selectedAlert.latitude);
    } else {
      console.log("Waiting for map to load before fetching services");
      map.current.once("load", () => {
        console.log("Map loaded, now fetching services");
        fetchNearbyServices(selectedAlert.longitude, selectedAlert.latitude);
      });
    }
  }, [showEmergencyServices, selectedAlert]);

  return (
    <MapContainer>
      <MapHeader>
        <h3>{category} Alert Locations</h3>
        <CloseButton onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </CloseButton>
      </MapHeader>
      <MapWrapper ref={mapContainer} />
    </MapContainer>
  );
};

export default AlertDetailMap;
