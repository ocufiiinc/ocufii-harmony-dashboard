import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AlertDetailMap from "../components/AlertDetailMap/AlertDetailMap";
import { ROUTE } from "../common/Routes";

const Map = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    // Get parameters from URL
    const alertId = searchParams.get("alert");
    const category = searchParams.get("category");
    const lng = searchParams.get("lng");
    const lat = searchParams.get("lat");
    const zoom = searchParams.get("zoom");
    const title = searchParams.get("title");
    const duration = searchParams.get("duration");
    const reason = searchParams.get("reason");

    // Validate required parameters
    if (!alertId || !category || !lng || !lat) {
      console.error("Missing required map parameters");
      navigate(ROUTE.DASHBOARD);
      return;
    }

    // Construct alert object from URL parameters
    const alert = {
      id: alertId,
      longitude: parseFloat(lng),
      latitude: parseFloat(lat),
      category: category,
      title: title || `${category} Alert`,
      duration: duration || "Unknown",
      notificationReason: reason || "Unknown",
    };

    setMapData({
      alerts: [alert],
      selectedAlert: alert,
      category: category,
    });
  }, [searchParams, navigate]);

  if (!mapData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Decimal, sans-serif",
        }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <AlertDetailMap
        alerts={mapData.alerts}
        selectedAlert={mapData.selectedAlert}
        category={mapData.category}
        showRecipients={false}
        showEmergencyServices={false}
        isLoadingRecipients={false}
        onClose={() => window.close()}
        onUpdateRecipientStatus={() => {}}
      />
    </div>
  );
};

export default Map;
