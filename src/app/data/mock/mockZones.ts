// export interface Zone {
//   id: number;
//   name: string;
//   type: string;
//   description?: string;
//   locationIds: number[];
//   cameraIds: number[];
//   createdAt?: string;
//   updatedAt?: string;
// }

export interface Zone {
  id: string;
  name: string;
  description?: string;
  locations?: LocationItem[];
  cameraIds?: string[];
}

export interface LocationItem {
  id: string;
  name: string;
  description?: string;
}


// export const mockZones: Zone[] = [
//   {
//     id: 101,
//     name: "Main Entrance",
//     type: "Entry",
//     description: "Primary entrance zone for all visitors and employees",
//     locationIds: [1, 2],
//     cameraIds: [5, 6],
//     createdAt: "2024-01-15",
//     updatedAt: "2024-01-15",
//   },
//   {
//     id: 102,
//     name: "Production Floor - Zone A",
//     type: "Production",
//     description: "Main manufacturing area with assembly lines",
//     locationIds: [3, 4],
//     cameraIds: [1, 2, 3],
//     createdAt: "2024-01-16",
//     updatedAt: "2024-01-16",
//   },
//   {
//     id: 103,
//     name: "Warehouse Storage",
//     type: "Storage",
//     description: "Primary storage area for raw materials and finished goods",
//     locationIds: [5],
//     cameraIds: [7, 8],
//     createdAt: "2024-01-17",
//     updatedAt: "2024-01-17",
//   },
//   {
//     id: 104,
//     name: "Loading Dock",
//     type: "Logistics",
//     description: "Loading and unloading zone for deliveries",
//     locationIds: [6],
//     cameraIds: [4],
//     createdAt: "2024-01-18",
//     updatedAt: "2024-01-18",
//   },
//   {
//     id: 105,
//     name: "Parking Lot - North",
//     type: "Parking",
//     description: "Employee and visitor parking area",
//     locationIds: [7],
//     cameraIds: [9, 10],
//     createdAt: "2024-01-19",
//     updatedAt: "2024-01-19",
//   },
// ];

// export const zoneTypes = [
//   "Entry",
//   "Production",
//   "Storage",
//   "Logistics",
//   "Parking",
//   "Office",
//   "Restricted",
//   "Common Area",
//   "Emergency Exit",
// ];
