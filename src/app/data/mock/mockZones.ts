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

