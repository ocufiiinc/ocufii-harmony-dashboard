import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";

const Popup = ({ map, activeNotification }) => {
  // a ref to hold the popup instance
  const popupRef = useRef();
  // a ref for an element to hold the popup's content
  const contentRef = useRef(document.createElement("div"));

  // instantiate the popup on mount, remove it on unmount
  useEffect(() => {
    if (!map) return;

    // create a new popup instance, but do not set its location or content yet
    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 20,
      anchor: "bottom",
      closeButton: true,
    });

    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, [map]);

  // when activeNotification changes, set the popup's location and content, and add it to the map
  useEffect(() => {
    if (!activeNotification || !activeNotification.coordinates) {
      if (popupRef.current) {
        popupRef.current.remove();
      }
      return;
    }

    const longitude = parseFloat(activeNotification.coordinates.lng);
    const latitude = parseFloat(activeNotification.coordinates.lat);

    if (!isNaN(longitude) && !isNaN(latitude)) {
      popupRef.current
        .setLngLat([longitude, latitude]) // set its position using activeNotification's coordinates
        .setHTML(contentRef.current.outerHTML) // use contentRef's `outerHTML` to set the content of the popup
        .addTo(map); // add the popup to the map
    }
  }, [activeNotification, map]);

  // use a react portal to render the content to show in the popup, assigning it to contentRef
  return (
    <>
      {createPortal(
        <div
          className="portal-content"
          style={{ padding: "10px", maxWidth: "200px" }}
        >
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              color:
                activeNotification?.priority === "high" ? "#dd3e3e" : "#f39c12",
            }}
          >
            {activeNotification?.title}: {activeNotification?.body}
          </div>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
            {activeNotification?.duration}
          </div>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
            4-J, Gulberg 3, Lahore
          </div>
          <div style={{ fontSize: "10px", color: "#999" }}>
            {activeNotification?.coordinates?.lat},{" "}
            {activeNotification?.coordinates?.lng}
          </div>
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Popup;
