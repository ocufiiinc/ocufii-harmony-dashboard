import React from "react";
import {
  DeviceHealthContainer,
  DeviceHealthHeader,
  DeviceHealthList,
  DeviceHealthItem,
  DeviceIcon,
  DeviceInfo,
  DeviceName,
  DeviceCount,
  DeviceStats,
  StatColumn,
  StatLabel,
  StatValue,
  StatTime,
} from "../../styles/SystemOverview.styled";
import { getDeviceIcon } from "../../utility/DeviceMapping";
import moment from "moment";
import { formatDateTime } from "../../utility/TimeFormat";

const DeviceHealthCard = ({ deviceHealthData }) => {
  // Use API data if available, otherwise fall back to devices prop
  const displayDevices = (deviceHealthData || []).map((device) => ({
    icon: getDeviceIcon(device.deviceType.toString()),
    count: device.totalCount,
    name: device.deviceTypeName,
    online: device.onlineCount,
    offline: device.offlineCount,
    snooze: device.snoozeCount,
    offlineTime: device.lastOnlineTime
      ? formatDateTime(device.lastOnlineTime)
      : "N/A",
  }));

  return (
    <DeviceHealthContainer>
      <DeviceHealthHeader>Device Health</DeviceHealthHeader>
      <DeviceHealthList>
        {displayDevices.map((device, index) => (
          <DeviceHealthItem key={index}>
            <DeviceIcon>
              <img src={device.icon} alt={device.name} />
            </DeviceIcon>
            <DeviceInfo>
              <DeviceCount>{device.count}</DeviceCount>
              <DeviceName>{device.name}</DeviceName>
            </DeviceInfo>
            <DeviceStats>
              <StatColumn>
                <StatLabel>Online</StatLabel>
                <StatValue $status="online">{device.online}</StatValue>
              </StatColumn>
              <StatColumn>
                <StatLabel>Offline</StatLabel>
                <StatValue $status="offline">{device.offline}</StatValue>
                <StatTime>{device.offlineTime}</StatTime>
              </StatColumn>
              <StatColumn>
                <StatLabel>Snooze</StatLabel>
                <StatValue $status="snooze">{device.snooze}</StatValue>
              </StatColumn>
            </DeviceStats>
          </DeviceHealthItem>
        ))}
      </DeviceHealthList>
    </DeviceHealthContainer>
  );
};

export default DeviceHealthCard;
