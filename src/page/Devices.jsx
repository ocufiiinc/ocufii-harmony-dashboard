import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardContent } from "../styles/Dashboard.styled";
import DashboardLayout from "../Layout/DashboardLayout";
import DataTable from "../components/DataTable";
import { DevicesContainer } from "../styles/Devices.styled";
import hubImage from "../assets/images/baseStation.png";
import beaconImg from "../assets/images/beacon.png";
import triggerLockImg from "../assets/images/lockbeacon.png";
import safettyCardImg from "../assets/images/safety_card2.png";
import { useUser } from "../context/UserContext";
import { getAllDevices } from "../api/DevicesApi";
import {
  BeaconColumn,
  HubsColumn,
  ConnectedLocksColumn,
  SafetyWearableCardsColumn,
} from "../common/ExampleData";
import { Loader } from "../styles/Loader";

const Devices = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { user } = useUser();

  const {
    data: devicesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["devices", user?.email],
    queryFn: () => getAllDevices(user?.email),
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Loader size="32px" />
            <div style={{ fontSize: "16px", color: "#666" }}>
              Loading devices...
            </div>
          </div>
        </DashboardContent>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              fontSize: "16px",
              color: "#666",
            }}
          >
            Error loading devices. Please try again.
          </div>
        </DashboardContent>
      </DashboardLayout>
    );
  }

  // Map API response to table format
  const mapHubsData = (hubs) => {
    if (!hubs?.devices || hubs.devices.length === 0) return [];

    return hubs.devices.map((hub, index) => ({
      id: index + 1,
      avatar: hubImage,
      name: hub.name,
      status: hub.status,
      location: hub.location || "N/A",
      wifiNetwork: hub.wifiNetwork ? JSON.parse(hub.wifiNetwork).SSID : "",
      macAddress: hub.macAddress,
      beaconStatus: hub.beaconStatus,
      hubSettings: "Settings",
      hub: true,
      connectedBeacons: hub.connectedBeaconsCount || 0,
    }));
  };

  const mapBeaconsData = (beacons) => {
    if (!beacons?.devices || beacons.devices.length === 0) return [];
    return beacons.devices.map((beacon, index) => ({
      id: index + 1,
      avatar: beaconImg,
      name: beacon.name,
      status: beacon.status,
      location: beacon.location || "N/A",
      macAddress: beacon.macAddress,
      NotificationSnooze: beacon.notificationSnooze,
      battery: `${beacon.battery}%`,
      beaconSettings: "Settings",
      beacon: true,
    }));
  };

  const mapConnectedLocksData = (locks) => {
    if (!locks?.devices || locks.devices.length === 0) return [];
    return locks.devices.map((lock, index) => ({
      id: index + 1,
      avatar: triggerLockImg,
      name: lock.name,
      status: lock.status,
      location: lock.location || "N/A",
      macAddress: lock.macAddress,
      NotificationSnooze: lock.notificationSnooze,
      battery: `${lock.battery}%`,
      lockSettings: "Settings",
      lock: true,
    }));
  };

  const mapSafetyWearableCardsData = (cards) => {
    if (!cards?.devices || cards.devices.length === 0) return [];
    return cards.devices.map((card, index) => ({
      id: index + 1,
      avatar: safettyCardImg,
      name: card.name,
      status: card.status,
      location: card.location || "View Location",
      cellularNetwork: card.cellularNetwork || "",
      macAddress: card.macAddress,
      battery: `${card.battery}%`,
      cardSettings: "Settings",
      safetyCard: true,
    }));
  };

  // Extract device data from API response or use example data as fallback
  console.log("Devices data from API:", devicesData);
  const hubsData = mapHubsData(devicesData?.data?.hubs);
  const beaconsData = mapBeaconsData(devicesData?.data?.beacons);
  const connectedLocksData = mapConnectedLocksData(
    devicesData?.data?.connectedLocks
  );
  const safetyWearableCardsData = mapSafetyWearableCardsData(
    devicesData?.data?.safetyWearableCards
  );

  return (
    <DashboardLayout>
      <DashboardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            padding: "0 24px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "450" }}>
            Devices
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "'Decimal', sans-serif",
              }}
            >
              Filter:
            </span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                padding: "10px 16px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "'Decimal', sans-serif",
                backgroundColor: "white",
                minWidth: "200px",
              }}
            >
              <option value="All">All Devices</option>
              <option value="Hubs">Hubs</option>
              <option value="Beacons">Beacons</option>
              <option value="Connected Locks">Connected Locks</option>
              <option value="Safety Wearable Cards">
                Safety Wearable Cards
              </option>
            </select>
          </div>
        </div>

        {(selectedFilter === "All" || selectedFilter === "Hubs") && (
          <DataTable
            className="devices-table"
            title="Hubs"
            columns={HubsColumn}
            data={hubsData}
          />
        )}
        {(selectedFilter === "All" || selectedFilter === "Beacons") && (
          <DataTable
            className="devices-table"
            title="Beacons"
            columns={BeaconColumn}
            data={beaconsData}
          />
        )}
        {(selectedFilter === "All" || selectedFilter === "Connected Locks") && (
          <DataTable
            className="devices-table"
            title="Connected Locks"
            columns={ConnectedLocksColumn}
            data={connectedLocksData}
          />
        )}
        {(selectedFilter === "All" ||
          selectedFilter === "Safety Wearable Cards") && (
          <DataTable
            className="devices-table"
            title="Safety Wearable Cards"
            columns={SafetyWearableCardsColumn}
            data={safetyWearableCardsData}
          />
        )}
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Devices;
