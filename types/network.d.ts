export {};

declare global {
  interface NetworkInformation {
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  }

  interface Navigator {
    connection?: NetworkInformation;
  }
}
