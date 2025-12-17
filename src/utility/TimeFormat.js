import moment from "moment";

/**
 * Calculate the time difference between a given UTC time and current UTC time
 * @param {string} utcTimeString - Time in format "2025-10-21T14:26:12+00:00"
 * @returns {string} - Human readable time difference like "7 mins ago", "10 mins ago", "5 secs ago"
 */
export const getTimeAgo = (utcTimeString) => {
  try {
    // Parse the input UTC time
    const inputTime = moment.utc(utcTimeString);

    // Get current UTC time
    const currentTime = moment.utc();

    // Calculate the difference in milliseconds
    const diffInMs = currentTime.diff(inputTime);

    // If the time is in the future, return "just now"
    if (diffInMs < 0) {
      return "just now";
    }

    // Convert to different units
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // Return appropriate format based on time difference
    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"} ago`;
    } else if (diffInSeconds > 0) {
      return `${diffInSeconds} ${diffInSeconds === 1 ? "sec" : "secs"} ago`;
    } else {
      return "just now";
    }
  } catch (error) {
    console.error("Error calculating time difference:", error);
    return "unknown";
  }
};

/**
 * Alternative function using moment's built-in fromNow() method
 * @param {string} utcTimeString - Time in format "2025-10-21T14:26:12+00:00"
 * @returns {string} - Human readable time difference using moment's built-in formatting
 */
export const getTimeAgoMoment = (utcTimeString) => {
  try {
    // Parse the input UTC time and convert to local time for fromNow()
    const inputTime = moment.utc(utcTimeString);

    // Use moment's built-in fromNow() method
    return inputTime.fromNow();
  } catch (error) {
    console.error("Error calculating time difference with moment:", error);
    return "unknown";
  }
};

/**
 * Format UTC time to local time in MM/DD/YY hh:mm AM/PM format
 * @param {string} utcTimeString - Time in format "2025-12-11T09:17:10.541101"
 * @returns {string} - Formatted time like "12/11/25 09:17 AM"
 */
export const formatDateTime = (utcTimeString) => {
  try {
    // Parse the UTC time and convert to local time
    const localTime = moment.utc(utcTimeString).local();

    // Format as MM/DD/YY hh:mm AM/PM
    return localTime.format("MM/DD/YY hh:mm A");
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "Invalid date";
  }
};

export const formatDate = (timestamp) => {
  return moment.utc(timestamp).local().format("DD-MMM-YYYY");
};

export const formatTime = (timestamp) => {
  return moment.utc(timestamp).local().format("hh:mm:ss A");
};

/**
 * Calculate the time difference between a given UTC time and current time
 * @param {string} utcTimeString - Time in UTC format
 * @returns {string} - Time difference like "1 min", "2 mins", "1 hour", "2 hours", etc.
 */
export const getTimeDifference = (utcTimeString) => {
  try {
    // Parse the input UTC time and convert to local
    const inputTime = moment.utc(utcTimeString).local();

    // Get current local time
    const currentTime = moment();

    // Calculate the difference in milliseconds
    const diffInMs = currentTime.diff(inputTime);

    // If the time is in the future, return "0 sec"
    if (diffInMs < 0) {
      return "0 sec";
    }

    // Convert to different units
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // Return appropriate format based on time difference
    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"}`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"}`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"}`;
    } else if (diffInSeconds > 0) {
      return `${diffInSeconds} ${diffInSeconds === 1 ? "sec" : "secs"}`;
    } else {
      return "0 sec";
    }
  } catch (error) {
    console.error("Error calculating time difference:", error);
    return "unknown";
  }
};
