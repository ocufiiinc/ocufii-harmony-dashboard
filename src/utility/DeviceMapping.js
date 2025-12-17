import { MdBatteryAlert, MdSignalWifiOff } from "react-icons/md";
import gunTriggerLock from "../assets/images/gun_trigger_lock.png";
import beaconImg from "../assets/images/beacon.png";
import wifiHubImg from "../assets/images/baseStation.png";
import flexibandImg from "../assets/images/flexiband.png";
import lockBeaconImg from "../assets/images/lockbeacon.png";
import slideLockImg from "../assets/images/bosLock.svg";
import safetyCardImg from "../assets/images/safety_card2.png";
import warningImg from "../assets/images/warning2.svg";

import dialImg from "../assets/images/988.png";
import emergenecyImg from "../assets/images/alarm-bell-ring-2.svg";
import emergenecyImg2 from "../assets/images/alarm-bell-3.png";
import { GiColtM1911 } from "react-icons/gi";
import { MdOutlineEmergency, MdSentimentDissatisfied } from "react-icons/md";
import { GiPistolGun } from "react-icons/gi";
import autoDialImg from "../assets/images/988-3.png";
import autoDialImgBlack from "../assets/images/988-2.png";
import autoDial911 from "../assets/images/Safety-911-2.png";
import autoDial911Black from "../assets/images/Safety-911-3.png";
import activeShooterImg from "../assets/images/active-shooter.svg";
import activeShooterBlackImg from "../assets/images/gun-black.png";
import feelingUnsafeImg from "../assets/images/feeling-unsafe.svg";
import feelingUnsafeBlackImg from "../assets/images/feeling-unsafe-black.png";

export const getDeviceIcon = (deviceType) => {
  switch (deviceType) {
    case "0":
    case "2":
    case "03":
      return beaconImg;
    case "1":
      return wifiHubImg;
    case "3":
      return flexibandImg;
    case "4":
      return lockBeaconImg;
    case "5":
      return gunTriggerLock;
    case "6":
      return slideLockImg;
    case "7":
      return safetyCardImg;
    default:
      return warningImg;
  }
};

export const getSafetyAlertIcon = (notificationReason, isFromMap = false) => {
  switch (notificationReason) {
    case "Emergency Alert":
    case "Emergency Alert Canceled":
      return {
        type: "image",
        src: isFromMap ? emergenecyImg2 : emergenecyImg,
        alt: "Emergency Alert",
      };

    case "Feeling Unsafe":
    case "Feeling Unsafe Alert":
    case "Feeling Unsafe Alert Canceled":
      return {
        type: "image",
        src: isFromMap ? feelingUnsafeBlackImg : feelingUnsafeImg,
        alt: "Feeling Unsafe Alert",
      };
    case "Active Shooter":
    case "Active Shooter Alert":
    case "Active Shooter Alert Canceled":
      return {
        type: "image",
        src: isFromMap ? activeShooterBlackImg : activeShooterImg,
        alt: "Active Shooter Alert",
      };
    case "Auto-Dial 911 Alert":
    case "Auto-Dial 911 Alert Canceled":
      return {
        type: "image",
        src: isFromMap ? autoDial911Black : autoDial911,
        alt: "Auto-Dial 911 Alert",
      };
    case "Auto-Dial 988 Alert Canceled":
    case "Auto-Dial 988 Alert":
      return {
        type: "image",
        src: isFromMap ? autoDialImgBlack : autoDialImg,
        alt: "Auto-Dial 988 Alert",
      };
    default:
      return { type: "icon", Component: MdOutlineEmergency };
  }
};
