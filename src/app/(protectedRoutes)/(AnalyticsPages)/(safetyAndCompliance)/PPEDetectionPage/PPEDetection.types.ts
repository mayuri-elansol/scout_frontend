export interface FilterParams {
  status?: string;
  employeeName?: string;
  startDate?: string;
  endDate?: string;
}
export interface TableData {
  id: number;
  helmet: boolean;
  vest: boolean;
  glasses: boolean;
  zone: string;
  snapshot: string;
  cameraid: string;
  alarmTriggered: boolean;
  createdAt: string;
}
