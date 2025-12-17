'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Videocam as VideocamIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

import { addCamera } from "@/app/services/configurator/cameraService";
import { detectNvrChannels } from "@/app/services/configurator/cameraService";
import { fetchZones, fetchLocations } from "@/app/services/configurator/cameraService";
import { CircularProgress } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Snackbar } from "@mui/material";

import type { OnboardingCamera } from "@/app/types/camera";
// interface CameraData {
//   id: string;
//   ipAddress: string;
//   cameraname: string;
//   username: string;
//   password: string;
//   port: string;
//   zoneId: string;
//   locationId: string;

//   rtspStream: string;
//   status: 'connected' | 'failed' | 'pending';
//   aiConfig?: {
//     useCases: string[];
//     roiData: Record<string, { configured: boolean }>;
//     fineTuning: Record<string, { tuned: boolean }>;
//     enabled: boolean;
//     viewName?: string;
//   };
// }

interface LocationOption {
  id: string;
  locationName: string;
}
interface AssignmentItem {
  channel: string;
  cameraName: string;
  cameraIp: string;
  username: string;
  password: string;
  port: string;
  zoneId: string;
  locationId: string;
  locationOptions: LocationOption[]; // list of locations for selected zone
}

interface CameraOnboardingStepProps {
  cameras: OnboardingCamera[];
  zones: { id: string; name: string }[];
  locations: { id: string; name: string; zoneId: string }[];

  onCameraAdd: (camera: OnboardingCamera) => void;
  onCameraBatchAdd?: (cameras: OnboardingCamera[]) => void;
  onCameraRemove: (cameraId: string) => void;

  onNext: () => void;
  onBack: () => void;
  isOptional?: boolean;
}


interface CameraFormData {
  ipAddress: string;
  username: string;
  cameraname: string;
  password: string;
  port: string;
  // zoneId: string;
  // locationId: string;

}

interface FormErrors {
  ipAddress?: string;
  cameraname?: string;
  username?: string;
  password?: string;
  port?: string;
}

const CameraOnboardingStep: React.FC<CameraOnboardingStepProps> = ({
  cameras,
  // zones = [],
  // locations = [],
  onCameraAdd,
  // onCameraBatchAdd,
  onCameraRemove,
  onNext,
  onBack,
  isOptional = false,
}) => {
  const [formData, setFormData] = useState<CameraFormData>({
    ipAddress: '',
    username: '',
    cameraname: '',
    password: '',
    port: '554',
  });

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  // const [pendingAssignments, setPendingAssignments] = useState<any[]>([]);
  const [pendingAssignments, setPendingAssignments] = useState<AssignmentItem[]>([]);

  const [selectedZone, setSelectedZone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  type ZoneItem = {
    id: string;
    zoneName: string;
  };

  type LocationItem = {
    id: string;
    locationName: string;
  };

  const [zoneList, setZoneList] = useState<ZoneItem[]>([]);
  const [locationList, setLocationList] = useState<LocationItem[]>([]);



  const [errors, setErrors] = useState<FormErrors>({});
  const [isAdding, setIsAdding] = useState(false);
  const [leftColumnHeight, setLeftColumnHeight] = useState<number>(0);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  // Toggle mode: 'camera' | 'nvr'
  const [mode, setMode] = useState<'camera' | 'nvr'>('camera');

  //camera discovering
  const [isDiscovering, setIsDiscovering] = useState(false);

  const [isSavingAssignments, setIsSavingAssignments] = useState(false);


  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState<string | null>(null);


  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | info | warning
  });

  type ToastSeverity = "success" | "error" | "info" | "warning";

const showToast = (message: string, severity: ToastSeverity = "success") => {
  setToast({ open: true, message, severity });
};


  // NVR Form state
  const [nvrData, setNvrData] = useState({
    name: '',
    ip: '',
    port: '8000',
    username: '',
    password: '',
    numberofchannels: '',
    rtsplink: '',
  });

 type NvrCamera = {
  channel: string;
};

const [nvrCameras, setNvrCameras] = useState<NvrCamera[]>([]);

  const [selectedNvrCams, setSelectedNvrCams] = useState<string[]>([]);


  useEffect(() => {
    const loadZones = async () => {
      try {
        const res = await fetchZones();
        setZoneList(res.data);
      } catch (err) {
        console.error("Error loading zones", err);
      }
    };
    loadZones();
  }, []);


  useEffect(() => {
    const loadLocations = async () => {
      if (!selectedZone) return;
      try {
        const res = await fetchLocations(selectedZone);  // backend service call
        setLocationList(res.data);
      } catch (err) {
        console.error("Error loading locations", err);
      }
    };

    loadLocations();
  }, [selectedZone]);




  useEffect(() => {
    const updateHeight = () => {
      if (leftColumnRef.current) {
        const height = leftColumnRef.current.offsetHeight;
        setLeftColumnHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Use timeout to ensure content is rendered
    setTimeout(updateHeight, 100);

    return () => window.removeEventListener('resize', updateHeight);
  }, [cameras, formData]);

  // IP validation helper functions
  const isValidIPv4 = (ip: string): boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

  const isValidIPv6 = (ip: string): boolean => {
    // Full IPv6 regex pattern
    const ipv6Regex = /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv6Regex.test(ip);
  };

  const isDuplicateIP = (ip: string): boolean => {
    return cameras?.some(camera => camera.ipAddress === ip.trim());
  };

  const isDuplicateName = (name: string): boolean => {
    return cameras?.some(camera => camera.cameraname.trim() === name.trim()) ?? false;

  };


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // IP Address validation
    if (!formData.ipAddress.trim()) {
      newErrors.ipAddress = 'IP Address is required';
    } else {
      const trimmedIP = formData.ipAddress.trim();

      // Check if it's a valid IPv4 or IPv6 address
      if (!isValidIPv4(trimmedIP) && !isValidIPv6(trimmedIP)) {
        newErrors.ipAddress = 'Please enter a valid IPv4 or IPv6 address';
      }
      // Check for duplicate IP
      else if (isDuplicateIP(trimmedIP)) {
        newErrors.ipAddress = 'This IP address is already added';
      }
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!formData.cameraname.trim()) {
      newErrors.cameraname = "Camera name is required";
    } else if (isDuplicateName(formData.cameraname.trim())) {
      newErrors.cameraname = "This camera name already exists";
    }


    if (!formData.port.trim()) {
      newErrors.port = 'Port is required';
    } else if (isNaN(Number(formData.port)) || Number(formData.port) < 1 || Number(formData.port) > 65535) {
      newErrors.port = 'Port must be a number between 1 and 65535';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CameraFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };



  const handleAddCamera = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsAdding(true);

    try {

      const response = await addCamera({
        cameraIp: formData.ipAddress.trim(),
        cameraName: formData.cameraname.trim(),
        userName: formData.username.trim(),
        password: formData.password.trim(),
        RTSPport: formData.port.trim(),
        // cameraZone: selectedZone,
        // channel: selectedLocation,
        cameraZone: zoneList.find(z => z.id === selectedZone)?.zoneName || "",
        channel: locationList.find(l => l.id === selectedLocation)?.locationName || "",

        refreshRate: 10,
        // connectionType: "DIRECT_TO_CAMERA",
        connectionType: "DIRECT_TO_CAMERA" as const,

      });

      onCameraAdd({
        id: crypto.randomUUID(),
        cameraname: formData.cameraname.trim(),
        ipAddress: formData.ipAddress.trim(),
        username: formData.username.trim(),
        password: formData.password.trim(),
        port: formData.port.trim(),
        zoneId: selectedZone,
        locationId: selectedLocation,
        status: "pending",
      });




      setFormData({
        ipAddress: "",
        cameraname: "",
        username: "",
        password: "",
        port: "554",
      });
      setSelectedZone("");
      setSelectedLocation("");
      showToast("Camera added successfully!", "success");



    } catch (error) {
      console.error("Add camera error:", error);
    }

    setIsAdding(false);
  };




  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon color="success" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      default:
        return <VideocamIcon color="action" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleSaveAssignments = async () => {
    setIsSavingAssignments(true);
    try {
      for (const cam of pendingAssignments) {
        if (!cam.zoneId) {
          alert(`Please select zone for ${cam.cameraName}`);
          return;
        }
        if (!cam.locationId) {
          alert(`Please select location for ${cam.cameraName}`);
          return;
        }


        const payload = {
          // cameraName: `${cam.cameraName}-${cam.channel}`,
          cameraName: `${cam.cameraName}`,
          // cameraIp: `${nvrData.ip}-${cam.channel}`,
          cameraIp: `${nvrData.ip}`,
          // do NOT add channel here
          userName: cam.username,
          password: cam.password,
          RTSPport: cam.port,
          cameraZone: zoneList.find(z => z.id === cam.zoneId)?.zoneName || "",
          channel: cam.locationOptions.find(l => l.id === cam.locationId)?.locationName || "",
          connectionType: "NVR" as const,
          refreshRate: 10,
        };

        console.log("Final payload:", payload);
        const response = await addCamera(payload);

        // 🔥 This updates UI instantly
        onCameraAdd({
          ipAddress: response.data.cameraIp,
          cameraname: response.data.cameraName,
          username: response.data.userName,
          password: response.data.password,
          port: response.data.RTSPport,
          zoneId: cam.zoneId,
          locationId: cam.locationId,
          id: '',
          status: 'connected'
        });
      }

      showToast("NVR cameras added successfully!", "success");
      setPendingAssignments([]);
      setAssignDialogOpen(false);
      setSelectedNvrCams([]);
      setNvrCameras([]);

      setNvrData({
        name: "",
        ip: "",
        port: "8000",
        username: "",
        password: "",
        numberofchannels: "",
        rtsplink: "",
      });



    } catch (error) {
      console.error("Error saving NVR assignments:", error);
    }

    setIsSavingAssignments(false);
  };

  return (
    <Box sx={{ p: 1, minHeight: 400, pb: 12 }}>
      <Typography variant="h6" gutterBottom>
        {isOptional ? 'Camera Setup (Optional)' : 'Camera Onboarding'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {isOptional
          ? 'Add cameras now or skip this step. You can always add and configure cameras later from the organization management page.'
          : 'Add cameras to your organization for monitoring and analytics'
        }
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* Left Column - CSV Upload & Manual Add */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            ref={leftColumnRef}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >



            {/* Add Camera Manually Form */}
            {/* NEW TOGGLE + CAMERA/NVR FORM SECTION */}
            <Card variant="outlined">
              <CardContent>

                {/* Toggle Buttons */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    variant={mode === "camera" ? "contained" : "outlined"}
                    onClick={() => setMode("camera")}
                    fullWidth
                  >
                    Add Camera Manually
                  </Button>

                  <Button
                    variant={mode === "nvr" ? "contained" : "outlined"}
                    onClick={() => setMode("nvr")}
                    fullWidth
                  >
                    Add NVR
                  </Button>
                </Box>

                {/* CAMERA FORM (Existing) */}
                {mode === "camera" && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Add Camera Manually
                    </Typography>

                    <form onSubmit={handleAddCamera}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="IP Address"
                            value={formData.ipAddress}
                            onChange={handleInputChange('ipAddress')}
                            error={!!errors.ipAddress}
                            helperText={errors.ipAddress}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Camera name"
                            value={formData.cameraname}
                            onChange={handleInputChange('cameraname')}
                            error={!!errors.cameraname}
                            helperText={errors.cameraname}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Username"
                            value={formData.username}
                            onChange={handleInputChange('username')}
                            error={!!errors.username}
                            helperText={errors.username}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            error={!!errors.password}
                            helperText={errors.password}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Port"
                            value={formData.port}
                            onChange={handleInputChange('port')}
                            error={!!errors.port}
                            helperText={errors.port}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            select
                            // label="Select Zone"
                            value={selectedZone}
                            onChange={(e) => {
                              setSelectedZone(e.target.value);
                              setSelectedLocation("");
                            }}
                            fullWidth
                            size="small"
                            SelectProps={{ native: true }}
                          >
                            {zoneList.map(zone => (
                              <option key={zone.id} value={zone.id}>{zone.zoneName}</option>
                            ))}


                          </TextField>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            select
                            // label="Select Location"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            fullWidth
                            size="small"
                            SelectProps={{ native: true }}
                            disabled={!selectedZone}
                          >
                            {locationList.map(loc => (
                              <option key={loc.id} value={loc.id}>{loc.locationName}</option>
                            ))}


                          </TextField>
                        </Grid>



                        <Grid size={{ xs: 12 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isAdding}
                          >
                            {isAdding ? 'Adding Camera...' : 'Add Camera'}

                          </Button>
                        </Grid>
                      </Grid>

                    </form>


                  </>
                )}

                {/* NVR FORM */}
                {mode === "nvr" && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Add NVR
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="NVR Name"
                          fullWidth
                          size="small"
                          value={nvrData.name}
                          onChange={(e) => setNvrData({ ...nvrData, name: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="NVR IP Address"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.ip}
                          onChange={(e) => setNvrData({ ...nvrData, ip: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <TextField
                          label="Port"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.port}
                          onChange={(e) => setNvrData({ ...nvrData, port: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <TextField
                          label="Username"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.username}
                          onChange={(e) => setNvrData({ ...nvrData, username: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <TextField
                          label="Password"
                          required
                          type="password"
                          fullWidth
                          size="small"
                          value={nvrData.password}
                          onChange={(e) => setNvrData({ ...nvrData, password: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <TextField
                          label="No of channels"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.numberofchannels}
                          onChange={(e) => setNvrData({ ...nvrData, numberofchannels: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="rstp link"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.rtsplink}
                          onChange={(e) => setNvrData({ ...nvrData, rtsplink: e.target.value })}
                        />
                      </Grid>


                    </Grid>

                    {/* Discover Cameras */}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      // onClick={() => {
                      //   // MOCK RESPONSE
                      //   setNvrCameras([
                      //     { id: "1", name: "Channel 1 - Front Gate" },
                      //     { id: "2", name: "Channel 2 - Entrance" },
                      //     { id: "3", name: "Channel 3 - Parking Area" },
                      //   ]);
                      // }}

                      onClick={async () => {
                        try {
                          setIsDiscovering(true);
                          const response = await detectNvrChannels({
                            nvrName: nvrData.name,
                            ip: nvrData.ip,
                            port: Number(nvrData.port),
                            username: nvrData.username,
                            password: nvrData.password,
                            numberofchannels: Number(nvrData.numberofchannels),
                            rtsplink: nvrData.rtsplink,
                          });

                          setNvrCameras(response.data.activeChannels);  // from backend
                        } catch (error) {
                          console.error("Detect NVR Error:", error);
                        } finally {
                          setIsDiscovering(false);
                        }
                      }}

                    >
                      {isDiscovering ? (
                        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                          <CircularProgress size={22} sx={{ color: "white" }} />
                        </Box>
                      ) : (
                        "Discover Cameras"
                      )}
                    </Button>

                    {/* Show discovered cameras */}
                    {nvrCameras.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Found Cameras:
                        </Typography>

                        {nvrCameras.map((camera) => (
                          <Box key={camera.channel} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <input
                              type="checkbox"
                              checked={selectedNvrCams.includes(camera.channel)}
                              onChange={() => {
                                if (selectedNvrCams.includes(camera.channel)) {
                                  setSelectedNvrCams((prev) => prev.filter(ch => ch !== camera.channel));
                                } else {
                                  setSelectedNvrCams((prev) => [...prev, camera.channel]);
                                }
                              }}
                            />
                            <Typography>{`${nvrData.ip} - ${camera.channel}`}</Typography>
                          </Box>
                        ))}

                        {/* Add Selected Cameras */}
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => {
                            const selected = nvrCameras.filter(cam =>
                              selectedNvrCams.includes(cam.channel)
                            );

                            const mapped = selected.map(cam => ({
                              channel: cam.channel,
                              // cameraName: `${nvrData.name}-Channel-${cam.channel}`,
                              cameraName: `${nvrData.name}-${cam.channel}-${Date.now()}`,
                              // cameraIp: `${nvrData.ip}-${cam.channel}`,
                              cameraIp: nvrData.ip,
                              // channel: cam.channel,

                              username: nvrData.username,
                              password: nvrData.password,
                              port: nvrData.port,
                              zoneId: "",
                              locationId: "",
                              locationOptions: [],
                            }));

                            setPendingAssignments(mapped);
                            setAssignDialogOpen(true);
                          }}
                        >
                          Add Selected Cameras
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

          </Box>



          <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Assign Zone & Location</DialogTitle>

            <DialogContent dividers>
              {pendingAssignments.map((cam, index) => (
                <Box key={cam.channel} sx={{ display: "flex", gap: 2, my: 1 }}>

                  <Typography sx={{
                    width: "25%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {cam.cameraName}
                  </Typography>

                  <TextField
                    select
                    value={cam.zoneId}
                    onChange={async (e) => {
                      const zoneId = e.target.value;
                      const updated = [...pendingAssignments];
                      updated[index].zoneId = zoneId;
                      updated[index].locationId = "";
                      setPendingAssignments(updated);

                      try {
                        const res = await fetchLocations(zoneId);
                        updated[index].locationOptions = res.data;
                        setPendingAssignments([...updated]);
                      } catch (err) {
                        console.error("Failed to load locations", err);
                      }
                    }}
                    SelectProps={{ native: true }}
                    sx={{ width: "30%" }}
                  >
                    <option value="">Select Zone</option>
                    {zoneList.map(z => (
                      <option key={z.id} value={z.id}>{z.zoneName}</option>
                    ))}
                  </TextField>

                  <TextField
                    select
                    value={cam.locationId}
                    onChange={(e) => {
                      const updated = [...pendingAssignments];
                      updated[index].locationId = e.target.value;
                      setPendingAssignments(updated);
                    }}
                    SelectProps={{ native: true }}
                    sx={{ width: "30%" }}
                    disabled={!cam.zoneId}
                  >
                    <option value="">Select Location</option>
                    {(cam.locationOptions ?? []).map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.locationName}</option>
                    ))}
                  </TextField>

                </Box>

              ))}
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleSaveAssignments}>
                {isSavingAssignments ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : (
                  "Save & Add Cameras"
                )}
              </Button>
            </DialogActions>
          </Dialog>

        </Grid>


        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 1, p: 1 }
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 600,
              fontSize: "1.1rem",
              pb: 1
            }}
          >
            <WarningAmberIcon color="warning" />
            Confirm Delete
          </DialogTitle>

          <DialogContent sx={{ py: 1 }}>
            <Typography sx={{ color: "#444", fontSize: ".9rem" }}>
              Are you sure you want to delete this camera?
              This action <b>cannot be undone</b>.
            </Typography>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setDeleteDialogOpen(false)}
              sx={{ borderRadius: 1 }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              // color="#c71e1eff"
              sx={{ borderRadius: 1, }}
              onClick={() => {
                if (cameraToDelete) {
                  onCameraRemove(cameraToDelete);
                  showToast("Camera deleted successfully!", "success");
                }
                setDeleteDialogOpen(false);
                setCameraToDelete(null);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>



        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert
            onClose={() => setToast({ ...toast, open: false })}
            severity={toast.severity as "success" | "error" | "info" | "warning"}
            variant="filled"
            sx={{ width: "100%", borderRadius: "8px" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>

        {/* Right Column - Onboarded Cameras List */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            variant="outlined"
            sx={{
              height: leftColumnHeight > 0 ? `${leftColumnHeight}px` : 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              p: 2,
              '&:last-child': { pb: 2 }
            }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                <VideocamIcon color="primary" />
                Onboarded Cameras ({cameras?.length || 0})
              </Typography>

              {(!cameras || cameras.length === 0) ? (
                <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
                  {isOptional
                    ? 'No cameras added yet. You can skip this step and add cameras later, or add cameras now using the form or CSV upload.'
                    : 'No cameras added yet. Add cameras to proceed to AI configuration.'
                  }
                </Alert>
              ) : (
                <Box sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  mt: 1,
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.2)',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,.3)',
                    },
                  },
                }}>
                  <List dense disablePadding>
                    {cameras.map((camera, index) => (
                      <React.Fragment key={camera.id}>
                        <ListItem>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                            {getStatusIcon(camera.status)}
                          </Box>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                                <Chip
                                  label={camera.status}
                                  color={getStatusColor(camera.status) as "success" | "error" | "default"}

                                  size="small"
                                />
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {camera.ipAddress}:{camera.port} ({camera.cameraname})
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              // onClick={() => onCameraRemove(camera.id)}
                              onClick={() => {
                                setCameraToDelete(camera.id);
                                setDeleteDialogOpen(true);
                              }}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < cameras?.length || 0 - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* <Box sx={{ display: 'flex', position:'fixed', justifyContent: 'space-between', mt: 4 }}> */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          backgroundColor: "white",
          borderTop: "1px solid #e0e0e0",
          py: 2,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          zIndex: 1000
        }}
      >
        <Button onClick={onBack} color="inherit">
          Back
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isOptional && (
            <Button
              onClick={onNext}
              variant="outlined"
            >
              Skip Camera Setup
            </Button>
          )}
          <Button
            onClick={onNext}
            variant="contained"
          // disabled={!isOptional && cameras?.length || 0 === 0}
          >
            {isOptional ? 'Continue with Cameras' : 'Next: AI Configuration'}
          </Button>
        </Box>
      </Box>
    </Box>


  );
};

export default CameraOnboardingStep;

