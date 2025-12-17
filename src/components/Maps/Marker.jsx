import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmergency, MdSentimentDissatisfied } from "react-icons/md";
import { GiPistolGun } from "react-icons/gi";
import { MdSensors, MdHealthAndSafety } from "react-icons/md";

const Marker = ({
  map,
  notification,
  selectedNotification,
  setSelectedNotification,
}) => {
  const contentRef = useRef(document.createElement("div"));
  const markerRef = useRef(null);
  const isSelected = notification?.id === selectedNotification?.id;

  const getIcon = (iconType) => {
    switch (iconType) {
      case "emergency":
        return <MdOutlineEmergency />;
      case "feeling-unsafe":
        return <MdSentimentDissatisfied />;
      case "active-shooter":
        return <GiPistolGun />;
      case "movement":
        return <MdSensors />;
      default:
        return <FaLocationDot />;
    }
  };

  useEffect(() => {
    if (!map || !notification) return;

    // Handle notifications that might not have location data
    let longitude, latitude;

    if (notification.coordinates) {
      longitude = parseFloat(notification.coordinates.lng);
      latitude = parseFloat(notification.coordinates.lat);
    }

    // If no valid coordinates, use random coordinates around Philadelphia area for demo
    if (isNaN(longitude) || isNaN(latitude)) {
      longitude = -75.204185 + (Math.random() - 0.5) * 0.1; // Random around Philly
      latitude = 39.967505 + (Math.random() - 0.5) * 0.1;
      console.log(
        `Using fallback coordinates for notification ${notification.id}:`,
        longitude,
        latitude
      );
    } else {
      console.log(
        `Using real coordinates for notification ${notification.id}:`,
        longitude,
        latitude
      );
    }

    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, [map, notification]);

  return (
    <>
      {createPortal(
        <div
          onClick={() => setSelectedNotification(notification)}
          style={{
            color: isSelected
              ? "#dd3e3e"
              : notification?.type === "safety"
              ? "#00BCD4"
              : notification?.type === "security"
              ? "#E91E63"
              : "#f39c12",
            fontSize: isSelected ? "32px" : "26px",
            cursor: "pointer",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "4px",
            border: isSelected ? "2px solid #dd3e3e" : "2px solid transparent",
          }}
        >
          {notification?.icon ? getIcon(notification.icon) : <FaLocationDot />}
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
