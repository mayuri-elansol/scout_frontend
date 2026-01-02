import { LocationItem } from "../components/organisms/configurator/zone-location/AssignLocationDrawer/AssignLocationsDrawer";

// Mock Zones Data
export interface Zone {
  id: string;
  name: string;
  type: string;
  description?: string;
  locationIds: number[];
  cameraIds: number[];
  locations?: LocationItem[]; // optional, used only when loading full data
  createdAt: string;
  updatedAt: string;
}

export const mockZones: Zone[] = [
  {
    id: '101',
    name: "Main Entrance",
    type: "Entry",
    description: "Primary entrance point for all visitors and employees",
    locationIds: [1, 2],
    cameraIds: [1, 5],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: '102',
    name: "Production Floor",
    type: "Manufacturing",
    description: "Main production area with assembly lines",
    locationIds: [3, 4],
    cameraIds: [2, 3],
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
 
];

export const zoneTypes = [
  "Entry",
  "Manufacturing",
  "Storage",
  "Loading",
  "Parking",
  "Office",
  "Security",
  "Restricted",
  "Common Area",
  "Emergency Exit",
];
