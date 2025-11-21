// Mock Locations Data
export interface Location {
  id: number;
  name: string;
  building?: string;
  floor?: string;
  description?: string;
  createdAt: string;
}

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "Building A - Floor 1",
    building: "Building A",
    floor: "Floor 1",
    description: "Ground floor main entrance area",
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: 2,
    name: "Building A - Reception",
    building: "Building A",
    floor: "Floor 1",
    description: "Main reception and waiting area",
    createdAt: "2024-01-10T08:15:00Z",
  },
  {
    id: 3,
    name: "Building A - Floor 2 East",
    building: "Building A",
    floor: "Floor 2",
    description: "East wing production area",
    createdAt: "2024-01-10T08:30:00Z",
  },
  {
    id: 4,
    name: "Building A - Floor 2 West",
    building: "Building A",
    floor: "Floor 2",
    description: "West wing production area",
    createdAt: "2024-01-10T08:45:00Z",
  },
  {
    id: 5,
    name: "Building B - Warehouse",
    building: "Building B",
    floor: "Floor 1",
    description: "Main warehouse storage",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: 6,
    name: "Building B - Loading Dock",
    building: "Building B",
    floor: "Ground",
    description: "External loading bay",
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: 7,
    name: "Outdoor - North Parking",
    building: "Outdoor",
    floor: "Ground",
    description: "North side parking lot",
    createdAt: "2024-01-10T09:30:00Z",
  },
  {
    id: 8,
    name: "Outdoor - South Parking",
    building: "Outdoor",
    floor: "Ground",
    description: "South side parking lot",
    createdAt: "2024-01-10T09:45:00Z",
  },
  {
    id: 9,
    name: "Building C - Office Floor 1",
    building: "Building C",
    floor: "Floor 1",
    description: "Administrative offices",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: 10,
    name: "Building C - Office Floor 2",
    building: "Building C",
    floor: "Floor 2",
    description: "Executive offices",
    createdAt: "2024-01-10T10:15:00Z",
  },
];
