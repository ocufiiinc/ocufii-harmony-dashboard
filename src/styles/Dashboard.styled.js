import styled from "styled-components";

// New Vertical Sidebar Dashboard Layout Components
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;

  .main-layout {
    display: flex;
    flex: 1;
    height: calc(100vh - 80px); /* Subtract header height */
    position: relative;

    @media (max-width: 1440px) {
      height: calc(100vh - 56px); /* Smaller header */
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .content-area {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }
  }
`;

export const DashboardHeader = styled.header`
  width: 100%;
  height: 80px;
  background: #ffffff;
  color: white;
  border-bottom: 3px solid #f7941d;
  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: 1440px) {
    height: 56px;
  }

  /* Inner container for centered content */
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: 1440px) {
      padding: 0 12px;
    }

    @media (max-width: 768px) {
      padding: 0 ${({ theme }) => theme.spacing.md};
    }
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  img {
    height: 32px;
    width: auto;

    @media (max-width: 1440px) {
      height: 24px;
    }
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: white;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.fontSize.md};
    }

    @media (max-width: 576px) {
      display: none;
    }
  }
`;

export const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  span {
    color: white;
    font-size: ${({ theme }) => theme.fontSize.sm};

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const VerticalSidebar = styled.nav`
  width: 330px;
  background: #ffffff;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  flex-shrink: 0;
  overflow-y: auto;
  position: relative;
  z-index: 1000;
  color: black;

  @media (max-width: 1440px) {
    width: 260px;
    padding: ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: 0;
    height: calc(100vh - 80px);
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

    &.open {
      transform: translateX(0);
    }
  }

  @media (max-width: 576px) {
    width: 240px;
  }
`;

export const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: block;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border-left: 4px solid transparent;
  margin: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 48px; /* Better touch target for mobile */

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${({ theme }) => theme.spacing.md};
    width: 30px;
    height: 30px;
    color: #000000;

    img {
      width: 30px;
      height: 30px;
      /* Converts white/black SVGs to black */
      filter: brightness(0) saturate(100%) invert(0%);
      color: #000000;
    }

    svg {
      width: 30px;
      height: 30px;
      color: #000000;
    }

    @media (max-width: 1440px) {
      width: 20px;
      height: 20px;
      margin-right: 8px;

      img {
        width: 20px;
        height: 20px;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .label {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: #000000;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-transform: capitalize;

    @media (max-width: 1440px) {
      font-size: 0.8rem;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);

    .label {
      color: rgba(237, 139, 0, 1);
    }
  }

  &.active {
    background: rgba(237, 139, 0, 0.2);
    border-left-color: #d16919;

    .icon {
      color: rgba(237, 139, 0, 1);

      img {
        filter: brightness(0) saturate(100%) invert(54%) sepia(78%)
          saturate(1512%) hue-rotate(360deg) brightness(98%) contrast(101%);
      }

      svg {
        color: rgba(237, 139, 0, 1);
      }
    }

    .label {
      color: rgba(237, 139, 0, 1);
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg}
      ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.spacing.sm};
    min-height: 52px; /* Larger touch target on mobile */

    .icon {
      width: 20px;
      height: 20px;
      margin-right: ${({ theme }) => theme.spacing.md};

      img {
        width: 24px;
        height: 24px;
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }

    .label {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.lg};

    .icon {
      img {
        width: 20px;
        height: 20px;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .label {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
  min-width: 0; /* Allow content to shrink */

  @media (max-width: 1440px) {
    padding: 16px 16px;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DashboardFooter = styled.footer`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xxl};
  background: #000000;
  color: white;
  border-top: 3px solid #f7941d;
  box-sizing: border-box;
  height: 60px;

  /* Center footer content */
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 1440px) {
    height: 44px;
    padding: 8px 16px;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  a {
    color: white;
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize.sm};
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: #f7941d;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};

    > div {
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.sm};
    }

    div {
      gap: ${({ theme }) => theme.spacing.md};
    }
  }
`;

// Active Alerts Components
export const ActiveAlertsSection = styled.div`
  width: 100%;

  h1 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: 1440px) {
    h1 {
      font-size: 1.1rem;
      margin: 0 0 12px 0;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;

export const AlertCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 0; /* Allow grid to shrink */
  width: 100%;

  @media (max-width: 1440px) {
    gap: 12px;
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* Prevent grid blowout */
  }

  /* When a card is selected, show selected card and map in first row, others in second row */
  ${({ $hasSelectedCard }) =>
    $hasSelectedCard &&
    `
    grid-template-columns: repeat(3, 1fr);
    
    .alert-card-wrapper {
      transition: all 0.3s ease;
      
      &.selected {
        grid-column: 1;
        grid-row: 1;
      }
      
      &:not(.selected) {
        grid-row: 2;
        grid-column: span 1;
      }
    }
    
    .map-wrapper {
      grid-column: 2 / 4;
      grid-row: 1;
      min-height: 480px;
    
    }
  `}

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);

    ${({ $hasSelectedCard }) =>
      $hasSelectedCard &&
      `
      grid-template-columns: 1fr;
      
      .alert-card-wrapper {
        &.selected {
          grid-column: 1;
        }
      }
      
      .map-wrapper {
        grid-column: 1;
        grid-row: auto;
        min-height: 400px;
      }
    `}
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};

    ${({ $hasSelectedCard }) =>
      $hasSelectedCard &&
      `
      .alert-card-wrapper {
        &.selected {
          grid-column: 1;
        }
        
        &:not(.selected) {
          grid-row: auto;
        }
      }
      
      .map-wrapper {
        grid-column: 1;
        grid-row: auto;
        min-height: 350px;
      }
    `}
  }
`;
export const AlertCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  min-width: 0; /* Prevent overflow */
  overflow: hidden; /* Prevent content from overflowing */

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  @media (max-width: 1440px) {
    padding: 12px;
    gap: 8px;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const AlertCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .view-all-link {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: #666;
    cursor: pointer;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: #f7941d;
    }
  }

  @media (max-width: 1440px) {
    h3 {
      font-size: 1rem;
    }

    .view-all-link {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    h3 {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;

export const AlertCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;

  .count-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 6px solid ${({ color }) => color || "#00BCD4"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    .count {
      font-size: 2rem;
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      color: ${({ theme }) => theme.colors.textPrimary};
      line-height: 1;
    }

    .label {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
    }
  }

  @media (max-width: 1440px) {
    padding: 4px 0;

    .count-circle {
      width: 60px;
      height: 60px;
      border-width: 3px;

      .count {
        font-size: 1.25rem;
      }

      .label {
        font-size: 0.6rem;
      }
    }
  }

  @media (max-width: 768px) {
    .count-circle {
      width: 80px;
      height: 80px;
      border-width: 5px;

      .count {
        font-size: 1.5rem;
      }

      .label {
        font-size: ${({ theme }) => theme.fontSize.xs};
      }
    }
  }
`;

export const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1440px) {
    gap: 8px;
  }
`;

export const AlertFilterDropdown = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;

  select {
    padding: 8px 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: white;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;

    &:hover {
      border-color: #00bcd4;
    }

    &:focus {
      outline: none;
      border-color: #00bcd4;
      box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.1);
    }
  }

  @media (max-width: 1440px) {
    padding: 4px 0;

    select {
      padding: 6px 10px;
      padding-right: 28px;
      font-size: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    select {
      font-size: ${({ theme }) => theme.fontSize.xs};
      padding: 6px 12px;
      padding-right: 32px;
    }
  }
`;

export const AlertItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
  border: 2px solid
    ${({ $isSelected }) => ($isSelected ? "rgba(0, 181, 226, 1)" : "#d0d0d0")};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  min-width: 0; /* Allow flex items to shrink */
  overflow: hidden; /* Prevent overflow */
  word-wrap: break-word; /* Allow long words to break */

  .alert-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.md};
  }

  .alert-left {
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    flex: 1;
  }

  .alert-bell-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 48px;
      height: 48px;
      color: #00bcd4;
    }
  }

  .device-image-wrapper {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }

  @media (max-width: 1440px) {
    padding: 10px;
    gap: 6px;

    .alert-header {
      gap: 8px;
    }

    .alert-left {
      gap: 8px;
    }

    .alert-bell-icon {
      width: 32px;
      height: 32px;

      svg {
        width: 32px;
        height: 32px;
      }
    }

    .device-image-wrapper {
      width: 32px;
      height: 32px;

      img {
        width: 32px;
        height: 32px;
      }
    }
  }

  .alert-datetime {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;

    .datetime {
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      white-space: pre-line;
      text-align: right;
      line-height: 1.3;
    }

    @media (max-width: 1440px) {
      gap: 2px;

      .datetime {
        font-size: 0.6rem;
      }
    }
  }

  .alert-device-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      width: 90px;
      height: 50px;
    }

    @media (max-width: 1440px) {
      width: 20px;
      height: 20px;

      img {
        width: 60px;
        height: 34px;
      }
    }
  }
  .alert-device-icon2 {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      width: 50px;
      height: 36px;
    }

    @media (max-width: 1440px) {
      width: 20px;
      height: 20px;

      img {
        width: 34px;
        height: 24px;
      }
    }
  }

  .alert-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .alert-name {
      font-size: 1.1rem;
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      color: ${({ theme }) => theme.colors.textPrimary};
      line-height: 1.2;
    }

    .alert-category {
      font-size: ${({ theme }) => theme.fontSize.sm};
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: ${({ theme }) => theme.fontWeight.normal};
    }

    .alert-subcategory {
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: ${({ theme }) => theme.fontWeight.normal};
    }

    @media (max-width: 1440px) {
      gap: 2px;

      .alert-name {
        font-size: 0.85rem;
      }

      .alert-category {
        font-size: 0.7rem;
      }

      .alert-subcategory {
        font-size: 0.65rem;
      }
    }
  }

  .alert-actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: center;

    .see-recipients-button,
    .emergency-services-button {
      flex: 1;
      padding: 10px 16px;
      background: transparent;
      border: 2px solid #00bcd4;
      border-radius: 8px;
      color: #00bcd4;
      font-size: ${({ theme }) => theme.fontSize.sm};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
      cursor: pointer;
      transition: all ${({ theme }) => theme.transitions.fast};
      white-space: nowrap;

      &:hover {
        background: #00bcd4;
        color: white;
      }
    }

    @media (max-width: 1440px) {
      gap: 6px;

      .see-recipients-button,
      .emergency-services-button {
        padding: 6px 10px;
        font-size: 0.7rem;
        border-width: 1.5px;
      }
    }
  }

  .alert-action-button {
    width: 100%;
    padding: 12px 16px;
    background: rgba(0, 181, 226, 1);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    white-space: nowrap;

    &:hover {
      background: #00a5bd;
    }

    &.red {
      background: #e10600;

      &:hover {
        background: #c82333;
      }
    }

    &.yellow {
      background: rgba(252, 196, 0, 1);
      color: #ffffff;

      &:hover {
        background: #e0a800;
      }
    }

    @media (max-width: 1440px) {
      padding: 8px 12px;
      font-size: 0.75rem;
    }
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &.security-alert {
    border-color: ${({ $isSelected }) => ($isSelected ? "#dc3545" : "#d0d0d0")};

    .alert-bell-icon svg {
      color: #dc3545;
    }
  }

  &.system-alert {
    border-color: ${({ $isSelected }) => ($isSelected ? "#ffc107" : "#d0d0d0")};

    .alert-bell-icon svg {
      color: #ffc107;
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};

    .alert-bell-icon {
      width: 40px;
      height: 40px;

      svg {
        width: 40px;
        height: 40px;
      }
    }

    .device-image-wrapper {
      width: 40px;
      height: 40px;

      img {
        width: 40px;
        height: 40px;
      }
    }

    .alert-device-icon {
      width: 24px;
      height: 24px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .alert-info {
      .alert-name {
        font-size: ${({ theme }) => theme.fontSize.md};
      }

      .alert-category {
        font-size: ${({ theme }) => theme.fontSize.xs};
      }
    }

    .alert-actions {
      flex-direction: column;
      width: 100%;

      .see-recipients-button,
      .emergency-services-button {
        width: 100%;
        padding: 10px 16px;
        font-size: ${({ theme }) => theme.fontSize.sm};
      }
    }
  }
`;

export const ViewAllButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ color }) => color || "#f7941d"};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1440px) {
    padding: 6px 10px;
    font-size: 0.7rem;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

// Alerts Chart Styles
export const AlertsChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    h2 {
      margin: 0;
      font-size: ${({ theme }) => theme.fontSize.lg};
      font-weight: ${({ theme }) => theme.fontWeight.semibold};
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    .month-selector {
      padding: 6px 12px;
      margin-right: 5px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      background: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.textPrimary};
      font-size: ${({ theme }) => theme.fontSize.sm};
      cursor: pointer;
      transition: all ${({ theme }) => theme.transitions.fast};

      &:hover {
        border-color: #f7941d;
      }

      &:focus {
        outline: none;
        border-color: #f7941d;
        box-shadow: 0 0 0 2px rgba(247, 148, 29, 0.1);
      }
    }
  }

  .chart-wrapper {
    width: 100%;
    height: 300px;
    position: relative;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};

    .chart-header {
      h2 {
        font-size: ${({ theme }) => theme.fontSize.md};
      }
    }

    .chart-wrapper {
      height: 250px;
    }
  }
`;

export const DashboardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  min-width: 0; /* Allow flex child to shrink */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 576px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

// Keep existing necessary components
export const DashboardMainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f7941d;
  }

  &.active {
    color: rgba(247, 148, 29, 1);
    font-weight: 600;
  }
`;

export const UserInitials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7941d 0%, #e8850b 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;
