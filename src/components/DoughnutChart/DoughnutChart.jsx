import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

const CenterText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 10;
`;

const TotalNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1;
`;

const TotalLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const DoughnutChart = ({ title, data, className }) => {
  // Calculate total from data
  const total = data.reduce((sum, value) => sum + value, 0);

  const chartData = {
    labels: ["Online", "Offline", "Snooze"],
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#4cdb4c", // Green for Online
          "#dd3e3e", // Red for Offline
          "#efef2d", // Yellow for Snooze
        ],
        borderColor: [
          "#3cb33c", // Darker green border
          "#c53030", // Darker red border
          "#d4d419", // Darker yellow border
        ],
        borderWidth: 2,
        cutout: "70%", // Creates the doughnut hole
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <ChartContainer className={className}>
      <ChartTitle>{title}</ChartTitle>
      <ChartWrapper>
        <Doughnut data={chartData} options={options} />
        <CenterText>
          <TotalNumber>{total}</TotalNumber>
          <TotalLabel>Total</TotalLabel>
        </CenterText>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default DoughnutChart;
