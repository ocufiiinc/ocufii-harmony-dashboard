import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Marker from "./Marker";
import Popup from "./Popup";
import { MapSection } from "../../styles/Alert.styled";

function AlertMap({
  selectedNotification,
  notifications,
  onNotificationSelect,
}) {
  console.log("SimpleMap notifications:", notifications);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);

  const handleMarkerClick = (notification) => {
    // Toggle popup - if same notification clicked, close it, otherwise show new one
    const newActive =
      activeNotification?.id === notification.id ? null : notification;
    setActiveNotification(newActive);

    // Also update the selected notification for the parent component
    if (onNotificationSelect) {
      onNotificationSelect(newActive);
    }
  };

  useEffect(() => {
    if (!mapboxgl.supported()) {
      alert("Your browser does not support Mapbox GL");
      return;
    }

    // Set your Mapbox access token
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FqYWFkLWNoYXVkcnkiLCJhIjoiY21qMnVwejFqMHdhOTNlcXdtd3Q5MnMxaiJ9.d4T-xn9cHbHM2KeOTTlGtA";

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-75.204185, 39.967505], // Default Philadelphia area
        zoom: 12.5,
        style: "mapbox://styles/mapbox/standard",
        pitch: 10,
        bearing: -17.6,
        antialias: true,
      });

      // Add fullscreen control to the map
      mapRef.current.addControl(new mapboxgl.FullscreenControl());
      // navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl());
      // compass controls
      mapRef.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false })
      );

      mapRef.current.on("load", () => {
        setMapLoaded(true);
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Center map on selected notification - this is the key flyTo functionality
  useEffect(() => {
    if (
      !selectedNotification ||
      !selectedNotification.coordinates ||
      !mapRef.current
    )
      return;

    const longitude = parseFloat(selectedNotification.coordinates.lng);
    const latitude = parseFloat(selectedNotification.coordinates.lat);
    console.log("Centering map to:", longitude, latitude);

    if (!isNaN(longitude) && !isNaN(latitude)) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        duration: 1000,
      });

      // Also show popup for the selected notification
      setActiveNotification(selectedNotification);
    }
  }, [selectedNotification]);

  return (
    <MapSection>
      <div className="map-container">
        <div style={{ height: "100%", width: "100%" }} ref={mapContainerRef} />
        {mapLoaded &&
          mapRef.current &&
          notifications &&
          notifications.length > 0 && (
            <>
              {console.log(`Rendering ${notifications.length} markers`)}
              {notifications.map((notification) => (
                <Marker
                  key={notification.id}
                  notification={notification}
                  map={mapRef.current}
                  selectedNotification={selectedNotification}
                  setSelectedNotification={handleMarkerClick}
                />
              ))}
            </>
          )}
        {mapLoaded && mapRef.current && (
          <Popup map={mapRef.current} activeNotification={activeNotification} />
        )}
      </div>
    </MapSection>
  );
}

export default AlertMap;
