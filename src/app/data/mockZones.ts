// Mock Zones Data
export interface Zone {
  id: number;
  name: string;
  type: string;
  description?: string;
  locationIds: number[];
  cameraIds: number[];
  createdAt: string;
  updatedAt: string;
}

export const mockZones: Zone[] = [
  {
    id: 101,
    name: "Main Entrance",
    type: "Entry",
    description: "Primary entrance point for all visitors and employees",
    locationIds: [1, 2],
    cameraIds: [1, 5],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: 102,
    name: "Production Floor",
    type: "Manufacturing",
    description: "Main production area with assembly lines",
    locationIds: [3, 4],
    cameraIds: [2, 3],
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: 103,
    name: "Warehouse Storage",
    type: "Storage",
    description: "Primary storage facility for raw materials and finished goods",
    locationIds: [5],
    cameraIds: [4],
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: 104,
    name: "Loading Dock",
    type: "Loading",
    description: "Truck loading and unloading area",
    locationIds: [6],
    cameraIds: [],
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-18T11:00:00Z",
  },
  {
    id: 105,
    name: "Parking Area",
    type: "Parking",
    description: "Employee and visitor parking lot",
    locationIds: [7, 8],
    cameraIds: [5],
    createdAt: "2024-01-19T12:00:00Z",
    updatedAt: "2024-01-19T12:00:00Z",
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
