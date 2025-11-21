export interface Location {
  id: number;
  name: string;
  building?: string;
  floor?: string;
  description?: string;
}

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "Building A - Floor 1",
    building: "Building A",
    floor: "Ground Floor",
    description: "Main entrance and reception area",
  },
  {
    id: 2,
    name: "Building A - Lobby",
    building: "Building A",
    floor: "Ground Floor",
    description: "Main lobby with visitor seating",
  },
  {
    id: 3,
    name: "Building A - Production Line 1",
    building: "Building A",
    floor: "First Floor",
    description: "Primary assembly line",
  },
  {
    id: 4,
    name: "Building A - Production Line 2",
    building: "Building A",
    floor: "First Floor",
    description: "Secondary assembly line",
  },
  {
    id: 5,
    name: "Building B - Warehouse",
    building: "Building B",
    floor: "Ground Floor",
    description: "Main warehouse storage area",
  },
  {
    id: 6,
    name: "Building B - Loading Dock",
    building: "Building B",
    floor: "Ground Floor",
    description: "Shipping and receiving area",
  },
  {
    id: 7,
    name: "Outdoor - North Parking",
    building: "Outdoor",
    floor: "Ground Level",
    description: "North parking lot",
  },
  {
    id: 8,
    name: "Building C - Office Block",
    building: "Building C",
    floor: "Multiple Floors",
    description: "Administrative offices",
  },
  {
    id: 9,
    name: "Building A - Cafeteria",
    building: "Building A",
    floor: "Ground Floor",
    description: "Employee dining area",
  },
  {
    id: 10,
    name: "Building B - Storage Room 1",
    building: "Building B",
    floor: "First Floor",
    description: "Additional storage space",
  },
];
