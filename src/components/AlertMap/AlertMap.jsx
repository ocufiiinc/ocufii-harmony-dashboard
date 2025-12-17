import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import {
  MapSection,
  MapMarker,
  MapInfoWindow,
} from "../../styles/Alert.styled";

const MapMarkerComponent = ({
  lat,
  lng,
  notification,
  onClick,
  isSelected,
}) => (
  <MapMarker
    isUrgent={notification.type === "emergency"}
    onClick={() => onClick(notification)}
  >
    <div className="marker" />
    {isSelected && (
      <MapInfoWindow urgent={notification.type === "emergency"}>
        <div className="info-type">{notification.type}</div>
        <div className="info-title">{notification.title}</div>
        <div className="info-details">Active for {notification.duration}</div>
        <div className="info-location">{notification.location}</div>
      </MapInfoWindow>
    )}
  </MapMarker>
);

const AlertMap = ({ selectedNotification, notifications }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Default center (Philadelphia area based on the image)
  const defaultCenter = {
    lat: 39.967505,
    lng: -75.204185,
  };

  // Use selected notification location or default
  const mapCenter = selectedNotification
    ? {
        lat: selectedNotification.coordinates.lat,
        lng: selectedNotification.coordinates.lng,
      }
    : defaultCenter;

  const handleMarkerClick = (notification) => {
    setSelectedMarker(
      selectedMarker?.id === notification.id ? null : notification
    );
  };

  // Get API key from window global variable set by config.js
  const apiKey = window.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  return (
    <MapSection>
      <div className="map-container">
        {apiKey ? (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: apiKey,
            }}
            center={mapCenter}
            defaultZoom={12}
            options={{
              styles: [
                {
                  featureType: "all",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#f5f5f5" }],
                },
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [{ color: "#c9e6f4" }],
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#ffffff" }],
                },
              ],
            }}
          >
            {notifications.map((notification) => (
              <MapMarkerComponent
                key={notification.id}
                lat={notification.coordinates.lat}
                lng={notification.coordinates.lng}
                notification={notification}
                onClick={handleMarkerClick}
                isSelected={selectedMarker?.id === notification.id}
              />
            ))}
          </GoogleMapReact>
        ) : (
          <div className="map-placeholder">
            <div>
              <h3>Map requires Google Maps API Key</h3>
              <p>Please set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file</p>
              <p>Click on notification cards to see their locations here.</p>
            </div>
          </div>
        )}
      </div>
    </MapSection>
  );
};

export default AlertMap;
