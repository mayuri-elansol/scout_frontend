"use client";

import { useState } from 'react';
import {
  Card,
  Box,
  InputBase,
  Select,
  Menu,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Search,
  Refresh,
  Check,
  ChevronRight,
  LocationOnOutlined,
  NotificationsNoneOutlined,
  FileDownloadOutlined,
  ExpandMore,
} from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AlertDrawer from '../AlertDrawer/AlertDrawer';

// ---------- Type definitions (exported) ----------
export type AlertSeverity = 'critical' | 'non-critical';
export type AlertStatus = 'new' | 'viewed' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  camera: string;
  zone: string;
  status: AlertStatus;
}

// ---------- Mock data ----------
const mockAlerts: Alert[] = [
  { id: 'ALT-20456', timestamp: '2026-07-07T17:42:00', severity: 'critical', title: 'Fire and Smoke Detection', camera: 'CAM-08', zone: 'Warehouse', status: 'new' },
  { id: 'ALT-20455', timestamp: '2026-07-07T17:40:00', severity: 'non-critical', title: 'PPE Detection (Helmet, Vest, Gloves, Mask)', camera: 'CAM-12', zone: 'Assembly Line', status: 'new' },
  { id: 'ALT-20454', timestamp: '2026-07-07T17:39:00', severity: 'non-critical', title: 'Employee Presence in Restricted Areas', camera: 'CAM-15', zone: 'Gate B', status: 'acknowledged' },
  { id: 'ALT-20453', timestamp: '2026-07-07T17:37:00', severity: 'non-critical', title: 'Forklift / Vehicle in Walkways', camera: 'CAM-04', zone: 'Loading Dock', status: 'viewed' },
  { id: 'ALT-20452', timestamp: '2026-07-07T17:35:00', severity: 'non-critical', title: 'Camera Tampering Detection', camera: 'CAM-02', zone: 'Parking', status: 'new' },
  { id: 'ALT-20451', timestamp: '2026-07-07T17:31:00', severity: 'critical', title: 'Fire and Smoke Detection', camera: 'CAM-20', zone: 'Warehouse', status: 'acknowledged' },
  { id: 'ALT-20450', timestamp: '2026-07-07T17:28:00', severity: 'non-critical', title: 'Crowd Detection in Hazardous Zones', camera: 'CAM-09', zone: 'Assembly Line', status: 'viewed' },
  { id: 'ALT-20449', timestamp: '2026-07-07T17:24:00', severity: 'non-critical', title: 'Vehicle Unloading / Loading Monitoring', camera: 'CAM-06', zone: 'Loading Dock', status: 'viewed' },
  { id: 'ALT-20448', timestamp: '2026-07-07T17:19:00', severity: 'non-critical', title: 'Vehicle Count & ANPR at Gates', camera: 'CAM-14', zone: 'Gate A', status: 'viewed' },
  { id: 'ALT-20447', timestamp: '2026-07-07T17:12:00', severity: 'critical', title: 'Intrusion Detection at Perimeter', camera: 'CAM-05', zone: 'Gate A', status: 'resolved' },
  { id: 'ALT-20446', timestamp: '2026-07-07T17:05:00', severity: 'non-critical', title: 'Canteen Usage Monitoring', camera: 'CAM-08', zone: 'canteen A', status: 'viewed' },
  { id: 'ALT-20445', timestamp: '2026-07-07T16:58:00', severity: 'non-critical', title: 'Mobile Phone Usage in Restricted Zones', camera: 'CAM-09', zone: 'Production Floor', status: 'viewed' },
];

// ---------- Timestamp formatting ----------
export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ---------- Status mapping ----------
const statusMap: Record<AlertStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: '#DC2626', bg: '#FDECEC' },
  viewed: { label: 'Viewed', color: '#475569', bg: '#F1F2F4' },
  acknowledged: { label: 'Acknowledged', color: '#B45309', bg: '#FEF6E7' },
  resolved: { label: 'Resolved', color: '#0F7A38', bg: '#EAF9EF' },
};

const severityMap: Record<AlertSeverity, { label: string; text: string; dot: string }> = {
  critical: { label: 'Critical', text: '#DC2626', dot: '#DC2626' },
  'non-critical': { label: 'Non-Critical', text: '#475569', dot: '#64748B' },
};

const headCells = [
  { label: 'Timestamp', width: '14%' },
  { label: 'Severity', width: '11%' },
  { label: 'Alert', width: '26%' },
  { label: 'Camera', width: '11%' },
  { label: 'Zone', width: '15%' },
  { label: 'Status', width: '15%' },
  { label: '', width: '8%' },
];

const selectSx = {
  height: 36,
  bgcolor: '#FFFFFF',
  borderRadius: '8px',
  fontSize: '12.5px',
  fontWeight: 600,
  color: '#6B7280',
  '& .MuiSelect-select': { p: '0 12px', display: 'flex', alignItems: 'center' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6B7280' },
};

const datePickerTextFieldSx = {
  width: 200,
  bgcolor: '#FFFFFF',
  borderRadius: '8px',
  '& .MuiOutlinedInput-root, & .MuiPickersOutlinedInput-root': {
    borderRadius: '8px',
    fontSize: '12.5px',
    height: 36,
  },
  '& .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-notchedOutline': {
    borderColor: '#E5E7EB',
  },
  '& .MuiInputLabel-root': { fontSize: '12.5px' },
  '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
    transform: 'translate(14px, 13px) scale(1)',
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': { fontSize: 18 },
};

const datePickerPaperSx = {
  '& .MuiDateCalendar-root': { width: 250, height: 280 },
  '& .MuiPickersCalendarHeader-label': { fontSize: '13px' },
  '& .MuiDayCalendar-weekDayLabel': { width: 30, height: 30, fontSize: '11px' },
  '& .MuiPickersDay-root': { width: 30, height: 30, fontSize: '11.5px' },
  '& .MuiPickersYear-yearButton': { fontSize: '12.5px' },
  '& .MuiMultiSectionDigitalClockSection-root': { width: 52 },
  '& .MuiMultiSectionDigitalClockSection-item': {
    fontSize: '11.5px',
    width: 36,
    minHeight: 28,
  },
  '& .MuiDialogActions-root .MuiButton-root': { fontSize: '12px' },
};

// ---------- Component ----------
export default function AlertsTable() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity[]>([]);
  const [statusFilter, setStatusFilter] = useState<AlertStatus | ''>('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [appliedStart, setAppliedStart] = useState<Dayjs | null>(null);
  const [appliedEnd, setAppliedEnd] = useState<Dayjs | null>(null);
  const [downloadAnchor, setDownloadAnchor] = useState<null | HTMLElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const toggleSeverity = (sev: AlertSeverity) => {
    setSeverityFilter((prev) =>
      prev.includes(sev) ? prev.filter((s) => s !== sev) : [...prev, sev]
    );
  };

  const filtered = mockAlerts.filter((alert) => {
    const q = search.toLowerCase();
    const matchesSearch =
      alert.title.toLowerCase().includes(q) ||
      alert.camera.toLowerCase().includes(q) ||
      alert.zone.toLowerCase().includes(q) ||
      alert.id.toLowerCase().includes(q);
    const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(alert.severity);
    const matchesStatus = !statusFilter || alert.status === statusFilter;
    const ts = dayjs(alert.timestamp);
    const matchesStart = !appliedStart || !ts.isBefore(appliedStart);
    const matchesEnd = !appliedEnd || !ts.isAfter(appliedEnd);
    return matchesSearch && matchesSeverity && matchesStatus && matchesStart && matchesEnd;
  });

  const handleRowClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedAlert(null);
  };

  const handleReset = () => {
    setSearch('');
    setSeverityFilter([]);
    setStatusFilter('');
    setCategoryFilter('');
    setStartDate(null);
    setEndDate(null);
    setAppliedStart(null);
    setAppliedEnd(null);
  };

  const handleApply = () => {
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
  };

  const exportColumns = ['Timestamp', 'Severity', 'Alert', 'Camera', 'Zone', 'Status'];
  const exportRows = () =>
    filtered.map((alert) => [
      formatTimestamp(alert.timestamp),
      severityMap[alert.severity].label,
      alert.title,
      alert.camera,
      alert.zone,
      statusMap[alert.status].label,
    ]);

  const handleDownloadCsv = () => {
    setDownloadAnchor(null);
    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [exportColumns, ...exportRows()]
      .map((row) => row.map(escape).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alerts_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    setDownloadAnchor(null);
    const { default: JsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new JsPDF();
    doc.setFontSize(14);
    doc.text('Active Alerts', 14, 16);
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text(`Exported ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`, 14, 22);
    autoTable(doc, {
      head: [exportColumns],
      body: exportRows(),
      startY: 28,
      styles: { fontSize: 8.5, cellPadding: 2.5 },
      headStyles: { fillColor: [37, 99, 235] },
    });
    doc.save(`alerts_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.pdf`);
  };

  return (
    <>
      <Card
        sx={{
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          boxShadow: '0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: '20px 24px 16px 24px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <NotificationsNoneOutlined sx={{ fontSize: 19, color: '#2563EB' }} />
            <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
              Total Alerts
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
            {filtered.length} of {mockAlerts.length}
          </Typography>
        </Box>

        {/* Filter bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '9px',
            p: '14px 20px',
            bgcolor: '#F5F7FA',
            borderTop: '1px solid #E5E7EB',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              bgcolor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              p: '0 12px',
              height: 36,
              minWidth: 220,
              flex: 1,
              maxWidth: 320,
            }}
          >
            <Search sx={{ fontSize: 18, color: '#9CA3AF' }} />
            <InputBase
              placeholder="Search camera, zone, alert ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ fontSize: '12.5px', width: '100%', color: '#111827', '& input': { p: 0 } }}
            />
          </Box>

          {(['critical', 'non-critical'] as AlertSeverity[]).map((sev) => {
            const active = severityFilter.includes(sev);
            return (
              <Box
                key={sev}
                component="button"
                onClick={() => toggleSeverity(sev)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  p: '7px 13px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: active ? '#111827' : '#E5E7EB',
                  bgcolor: active ? '#111827' : '#FFFFFF',
                  color: active ? '#fff' : '#6B7280',
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: severityMap[sev].dot,
                  }}
                />
                {severityMap[sev].label}
              </Box>
            );
          })}

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AlertStatus | '')}
            displayEmpty
            size="small"
            sx={selectSx}
          >
            <MenuItem value="">All statuses</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="viewed">Viewed</MenuItem>
            <MenuItem value="acknowledged">Acknowledged</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty
            size="small"
            sx={selectSx}
          >
            <MenuItem value="">All categories</MenuItem>
            <MenuItem value="safety">Safety &amp; Compliance</MenuItem>
            <MenuItem value="surveillance">Surveillance</MenuItem>
            <MenuItem value="operational">Operational</MenuItem>
                        <MenuItem value="workforce">Workforce</MenuItem>

          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start date"
              value={startDate}
              onChange={(value) => setStartDate(value as Dayjs | null)}
              maxDateTime={endDate ?? undefined}
              format="DD-MM-YYYY HH:mm:ss"
              views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
              slotProps={{
                textField: { size: 'small', sx: datePickerTextFieldSx },
                desktopPaper: { sx: datePickerPaperSx },
                mobilePaper: { sx: datePickerPaperSx },
              }}
            />
            <DateTimePicker
              label="End date"
              value={endDate}
              onChange={(value) => setEndDate(value as Dayjs | null)}
              minDateTime={startDate ?? undefined}
              format="DD-MM-YYYY HH:mm:ss"
              views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
              slotProps={{
                textField: { size: 'small', sx: datePickerTextFieldSx },
                desktopPaper: { sx: datePickerPaperSx },
                mobilePaper: { sx: datePickerPaperSx },
              }}
            />
          </LocalizationProvider>
          <Button
            startIcon={<Check sx={{ fontSize: 15 }} />}
            onClick={handleApply}
            sx={{
              bgcolor: '#2563EB',
              border: '1px solid #2563EB',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'none',
              px: '14px',
              height: 36,
              '&:hover': { bgcolor: '#1D4ED8', borderColor: '#1D4ED8' },
            }}
          >
            Apply
          </Button>
          <Button
            startIcon={<FileDownloadOutlined sx={{ fontSize: 15 }} />}
            endIcon={<ExpandMore sx={{ fontSize: 15 }} />}
            onClick={(e) => setDownloadAnchor(e.currentTarget)}
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              color: '#111827',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'none',
              px: '14px',
              height: 36,
              '&:hover': { bgcolor: '#F3F4F6', borderColor: '#2563EB' },
            }}
          >
            Download
          </Button>
          <Menu
            anchorEl={downloadAnchor}
            open={Boolean(downloadAnchor)}
            onClose={() => setDownloadAnchor(null)}
          >
            <MenuItem sx={{ fontSize: '12.5px', fontWeight: 600 }} onClick={handleDownloadCsv}>
              Download as CSV
            </MenuItem>
            <MenuItem sx={{ fontSize: '12.5px', fontWeight: 600 }} onClick={handleDownloadPdf}>
              Download as PDF
            </MenuItem>
          </Menu>
          <Button
            startIcon={<Refresh sx={{ fontSize: 15 }} />}
            onClick={handleReset}
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              color: '#111827',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'none',
              px: '14px',
              height: 36,
              '&:hover': { bgcolor: '#F3F4F6', borderColor: '#2563EB' },
            }}
          >
            Reset
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell
                    key={cell.label || 'arrow'}
                    sx={{
                      width: cell.width,
                      bgcolor: '#F9FAFB',
                      p: '12px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '.04em',
                      color: '#6B7280',
                      borderBottom: '1px solid #E5E7EB',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((alert, idx) => (
                <TableRow
                  key={alert.id}
                  onClick={() => handleRowClick(alert)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: idx % 2 === 0 ? '#FAFBFC' : '#FFFFFF',
                    '&:hover': { bgcolor: '#F3F4F6' },
                    '&:hover .row-arrow': { bgcolor: '#EEF2FB', color: '#2563EB' },
                    '&:last-child td': { borderBottom: 'none' },
                    '& td': {
                      p: '13px 16px',
                      fontSize: '13.5px',
                      borderBottom: '1px solid #E5E7EB',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      fontFamily: 'ui-monospace, monospace',
                      color: '#6B7280 !important',
                      fontSize: '12.5px !important',
                    }}
                  >
                    {formatTimestamp(alert.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: severityMap[alert.severity].text,
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          bgcolor: severityMap[alert.severity].dot,
                        }}
                      />
                      {severityMap[alert.severity].label}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#111827' }}>{alert.title}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '12px',
                        bgcolor: '#F5F7FA',
                        border: '1px solid #E5E7EB',
                        p: '3px 8px',
                        borderRadius: '6px',
                        color: '#6B7280',
                        fontWeight: 600,
                      }}
                    >
                      {alert.camera}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#6B7280',
                        fontWeight: 500,
                      }}
                    >
                      <LocationOnOutlined sx={{ fontSize: 15, color: '#9CA3AF' }} />
                      {alert.zone}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        fontSize: '11px',
                        fontWeight: 700,
                        p: '3px 10px',
                        borderRadius: '20px',
                        bgcolor: statusMap[alert.status].bg,
                        color: statusMap[alert.status].color,
                      }}
                    >
                      {statusMap[alert.status].label}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" className="row-arrow" sx={{ color: '#6B7280' }}>
                      <ChevronRight sx={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <AlertDrawer open={drawerOpen} onClose={handleCloseDrawer} alert={selectedAlert} />
    </>
  );
}
