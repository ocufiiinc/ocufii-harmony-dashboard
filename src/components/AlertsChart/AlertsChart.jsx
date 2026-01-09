import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { AlertsChartContainer } from "../../styles/Dashboard.styled";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import { getDashboard } from "../../api/DashboardApi";
import ColorCircle from "../ColorCircle";
import styled from "styled-components";
import {
  CustomDropdown,
  CustomDropdownButton,
  CustomDropdownMenu,
  CustomDropdownItem,
} from "../../styles/Alert.styled";
import { dateRangeMap } from "../../common/CommonData";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AlertsChart = () => {
  const { user } = useUser();
  const [selectedType, setSelectedType] = useState("total");
  const [selectedRange, setSelectedRange] = useState("7days");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // Fetch dashboard data for chart
  const { data: apiData } = useQuery({
    queryKey: ["dashboard-chart", user?.email, selectedRange],
    queryFn: () =>
      getDashboard(user?.email || "", 1000, dateRangeMap[selectedRange]),
    enabled: !!user?.email,
    refetchInterval: 120000, // Refetch every 2 minutes
  });

  // Extract alerts from API response
  const safetyAlerts = apiData?.data?.safety?.alerts || [];
  const securityAlerts = apiData?.data?.security?.alerts || [];
  const systemAlerts = apiData?.data?.system?.alerts || [];

  // Process alerts data based on selected filters
  const chartData = useMemo(() => {
    // Generate labels based on date range
    const now = moment();
    const daysCount =
      selectedRange === "24hours"
        ? 1
        : selectedRange === "7days"
        ? 7
        : selectedRange === "15days"
        ? 15
        : 30;

    const labels = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const date = moment().subtract(i, "days").format("MMM D");
      labels.push(date);
    }

    // Helper function to process alerts by type
    const processAlertsByType = (alerts) => {
      const filteredAlerts = alerts.filter((alert) => {
        const alertDate = moment(alert.duration);
        switch (selectedRange) {
          case "24hours":
            return alertDate.isSame(now, "day");
          case "7days":
            return alertDate.isAfter(now.clone().subtract(7, "days"));
          case "15days":
            return alertDate.isAfter(now.clone().subtract(15, "days"));
          case "30days":
            return alertDate.isAfter(now.clone().subtract(30, "days"));
          default:
            return true;
        }
      });

      // Group alerts by date
      const groupedByDate = filteredAlerts.reduce((acc, alert) => {
        const date = moment(alert.duration).format("MMM D");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Map to values array
      const values = labels.map((label) => groupedByDate[label] || 0);
      return values;
    };

    if (selectedType === "total") {
      // Return datasets for all three types
      return {
        labels,
        datasets: [
          {
            label: "Safety",
            data: processAlertsByType(safetyAlerts),
            borderColor: "rgba(0, 181, 226, 1)",
            backgroundColor: "rgba(0, 181, 226, 0.1)",
          },
          {
            label: "Security",
            data: processAlertsByType(securityAlerts),
            borderColor: "rgba(225, 6, 0, 1)",
            backgroundColor: "rgba(225, 6, 0, 0.1)",
          },
          {
            label: "System",
            data: processAlertsByType(systemAlerts),
            borderColor: "rgba(255, 248, 40, 1)",
            backgroundColor: "rgba(255, 248, 40, 0.1)",
          },
        ],
      };
    } else {
      // Return single dataset for selected type
      let alertsToProcess = [];
      let color = {};
      switch (selectedType) {
        case "safety":
          alertsToProcess = safetyAlerts;
          color = {
            borderColor: "rgba(0, 181, 226, 1)",
            backgroundColor: "rgba(0, 181, 226, 0.1)",
          };
          break;
        case "security":
          alertsToProcess = securityAlerts;
          color = {
            borderColor: "rgba(225, 6, 0, 1)",
            backgroundColor: "rgba(225, 6, 0, 0.1)",
          };
          break;
        case "system":
          alertsToProcess = systemAlerts;
          color = {
            borderColor: "rgba(255, 248, 40, 1)",
            backgroundColor: "rgba(255, 248, 40, 0.1)",
          };
          break;
      }

      return {
        labels,
        datasets: [
          {
            label: "Alerts",
            data: processAlertsByType(alertsToProcess),
            ...color,
          },
        ],
      };
    }
  }, [safetyAlerts, securityAlerts, systemAlerts, selectedType, selectedRange]);

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: selectedType === "total",
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
          },
          stepSize: 5,
        },
      },
    },
  };

  return (
    <AlertsChartContainer>
      <div className="chart-header">
        <h2>Alerts Summary</h2>
        <div>
          <CustomDropdown>
            <CustomDropdownButton
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            >
              {selectedType === "total" && "Total Alerts"}
              {selectedType === "safety" && "Safety"}
              {selectedType === "security" && "Security"}
              {selectedType === "system" && "System"}
            </CustomDropdownButton>
            {isTypeDropdownOpen && (
              <CustomDropdownMenu>
                <CustomDropdownItem
                  $selected={selectedType === "total"}
                  onClick={() => {
                    setSelectedType("total");
                    setIsTypeDropdownOpen(false);
                  }}
                >
                  <span>Total Alerts</span>
                </CustomDropdownItem>
                <CustomDropdownItem
                  $selected={selectedType === "safety"}
                  onClick={() => {
                    setSelectedType("safety");
                    setIsTypeDropdownOpen(false);
                  }}
                >
                  <ColorCircle color="rgba(0, 181, 226, 1)" />
                  <span>Safety</span>
                </CustomDropdownItem>
                <CustomDropdownItem
                  $selected={selectedType === "security"}
                  onClick={() => {
                    setSelectedType("security");
                    setIsTypeDropdownOpen(false);
                  }}
                >
                  <ColorCircle color="rgba(225, 6, 0, 1)" />
                  <span>Security</span>
                </CustomDropdownItem>
                <CustomDropdownItem
                  $selected={selectedType === "system"}
                  onClick={() => {
                    setSelectedType("system");
                    setIsTypeDropdownOpen(false);
                  }}
                >
                  <ColorCircle color="rgba(255, 248, 40, 1)" />
                  <span>System</span>
                </CustomDropdownItem>
              </CustomDropdownMenu>
            )}
          </CustomDropdown>
          <select
            className="month-selector"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option value="24hours">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="15days">Last 15 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </AlertsChartContainer>
  );
};

export default AlertsChart;
