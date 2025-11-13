'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';

import {
  CropSquare as RectangleIcon,
  Pentagon as PolygonIcon,
  Gesture as FreehandIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Clear as ClearIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Palette as PaletteIcon,
  Edit as EditIcon,
  SwapHoriz as ToggleIcon,
  Check as IncludeIcon,
  Block as ExcludeIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';

type DrawingTool = 'rectangle' | 'polygon' | 'freehand';

interface Point {
  x: number;
  y: number;
}

interface ROIShape {
  type: DrawingTool;
  points: Point[];
  completed: boolean;
  color: string;
  name: string;
  mode: 'include' | 'exclude';
}

interface RoiSelectionModalProps {
  open: boolean;
  onClose: () => void;
  cameraFeedUrl: string;
  useCaseName: string;
  existingROI?: ROIShape[];
  onSave: (roiShapes: ROIShape[]) => void;
}


const ROI_COLORS = [
  '#00ff00', // Bright Green
  '#ff0000', // Red
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ff8800', // Orange
  '#8800ff', // Purple
  '#00ff88', // Teal Green
  '#ff1493', // Deep Pink
];

// Predefined labels per use case
const USE_CASE_LABELS: Record<string, string[]> = {
  'Personal Protective Equipment (PPE) Detection': ['Helmet', 'Vest', 'Gloves', 'Goggles', 'Shoes'],
  'Object Detection in Walking Bays': ['Person', 'Object', 'Forklift', 'Obstacle'],
  'Fire, Smoke, Oil and Gas Leak Detection': ['Fire', 'Smoke', 'Oil Leak', 'Gas Leak'],
  'Vehicle Speed Monitoring inside premises': ['Vehicle', 'Speed Limit', 'Overspeed', 'Zone'],
  'Fall Detection (Person falling on the floor)': ['Standing Person', 'Fallen Person'],
  'Laydown/Sleeping Detection in Work Areas': ['Active Worker', 'Lying Down', 'Sleeping'],
  'Stacker, Forklift or Equipment in Gangway': ['Forklift', 'Stacker', 'Person', 'Gangway'],
  'STP/ETP Overflow Detection': ['Water Level', 'Overflow', 'Normal'],
  'Emergency Exit Blockage Detection': ['Exit Door', 'Blocked Area', 'Open Path'],
  'Crowd Gathering in Hazardous Zones': ['Person', 'Crowd', 'Hazard Zone'],
  'Intrusion Detection at Premises Perimeter': ['Person', 'Vehicle', 'Animal', 'Intruder'],
  'Unauthorized Access in Restricted Areas': ['Authorized', 'Unauthorized', 'Restricted Zone'],
  'Camera Tampering or Offline Detection': ['Normal View', 'Tampered', 'Offline'],
  'People Presence during Shutdown Hours': ['Person', 'No Presence', 'Restricted Zone'],
  'Employee Presence Detection in Critical Areas': ['Authorized Employee', 'Unauthorized', 'Critical Zone'],
  'Face Recognition for Entry/Exit Logging': ['Recognized', 'Unrecognized', 'Employee', 'Visitor'],
  'Face recognition for access control and logging': ['Authorized', 'Unauthorized', 'Visitor', 'Blocked Access'],
  'Employee Idle Time Monitoring': ['Active', 'Idle', 'Away'],
  'Monitor employee idle time and productivity': ['Working', 'Idle', 'Break'],
  'Mobile Phone Usage in Restricted Areas': ['Person', 'Using Phone', 'Restricted Zone'],
  'Sleeping or Absence of Security Personnel': ['Awake', 'Sleeping', 'Absent'],
  'People Count in Factory Premises': ['Person', 'Crowd', 'Entry', 'Exit'],
  'Vehicle Count & ANPR at Entry/Exit Gates': ['Car', 'Truck', 'Bike', 'License Plate'],
  'Monitoring Canteen Usage & Timings': ['Person', 'Canteen Queue', 'Dining Area'],
  'Tracking Vehicle Unloading/Loading Time': ['Truck', 'Container', 'Dock', 'Worker'],
  'Unauthorized Parking or Equipment Blocking Aisles': ['Parked Vehicle', 'Blocked Aisle', 'Forklift'],
  'OCR Detection': ['Text', 'Document', 'License Plate', 'Board'],
  default: ['ROI Zone 1', 'ROI Zone 2', 'ROI Zone 3'],
};


const RoiSelectionModal: React.FC<RoiSelectionModalProps> = ({
  open,
  onClose,
  cameraFeedUrl,
  useCaseName,
  existingROI,
  onSave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [drawingTool, setDrawingTool] = useState<DrawingTool>('rectangle');
  const [roiMode, setRoiMode] = useState<'include' | 'exclude'>('include');
  const [roiShapes, setRoiShapes] = useState<ROIShape[]>([]);
  const [currentShape, setCurrentShape] = useState<ROIShape | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string>(ROI_COLORS[0]);
  const [nextColorIndex, setNextColorIndex] = useState(0);
  // const getNextColor = () => {
  //   const color = ROI_COLORS[nextColorIndex];
  //   setNextColorIndex((nextColorIndex + 1) % ROI_COLORS.length);
  //   return color;
  // };
  const nextColorRef = useRef(0);

  const getNextColor = useCallback(() => {
    const idx = nextColorRef.current % ROI_COLORS.length;
    nextColorRef.current = (nextColorRef.current + 1) % ROI_COLORS.length;
    return ROI_COLORS[idx];
  }, []);


  const [selectedROIIndex, setSelectedROIIndex] = useState<number | null>(null);
  const [editingNameIndex, setEditingNameIndex] = useState<number | null>(null);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; roiIndex: number } | null>(null);
  const [labelMenu, setLabelMenu] = useState<{ x: number; y: number; roiIndex: number } | null>(null);
  const [modeMenuAnchor, setModeMenuAnchor] = useState<null | HTMLElement>(null);

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [history, setHistory] = useState<ROIShape[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Label currently selected in the toolbar dropdown
  const [selectedLabel, setSelectedLabel] = useState<string>(
    (USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default)[0]
  );

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      const roiToLoad = existingROI || [];
      setRoiShapes(roiToLoad);
      setHistory([roiToLoad]);
      setHistoryIndex(0);
      setCurrentShape(null);
      setIsDrawing(false);
      setImageLoaded(false);
      setSelectedROIIndex(null);
      setEditingNameIndex(null);

      // ensure toolbar label matches use case
      const first = (USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default)[0];
      setSelectedLabel(first);
    }
  }, [open, useCaseName, existingROI]);

  // Load and setup image
 
  // Load and setup image
useEffect(() => {
  console.log("🟡 useEffect triggered", { open, cameraFeedUrl, useCaseName });
  if (!open) return;
  console.log("🟢 Modal is open — starting image reload logic");

  // Wait briefly for the <img> to mount in the Dialog portal
  const delay = setTimeout(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    console.log("🔵 imgRef.current after delay:", img);

    if (!img || !canvas || !container) {
      console.warn("⚠️ DOM refs not ready yet. Skipping image load.");
      return;
    }

    setImageLoaded(false);

    img.onload = () => {
      console.log("✅ Image loaded successfully:", img.src);

      const containerWidth = container.clientWidth || 640;
      const aspectRatio = img.naturalWidth / img.naturalHeight || 16 / 9;

      const newCanvasWidth = containerWidth;
      const newCanvasHeight = containerWidth / aspectRatio;

      canvas.width = newCanvasWidth;
      canvas.height = newCanvasHeight;

      setCanvasWidth(newCanvasWidth);
      setCanvasHeight(newCanvasHeight);
      setImageLoaded(true);

      requestAnimationFrame(() => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, newCanvasWidth, newCanvasHeight);
          console.log("🎨 Canvas drawn successfully");
        }
      });
    };

    img.onerror = (err) => {
      console.error("❌ Image load failed:", err);
      setImageLoaded(false);
    };

    img.crossOrigin = "anonymous";

    const freshUrl = cameraFeedUrl.includes("?")
      ? `${cameraFeedUrl}&_ts=${Date.now()}`
      : `${cameraFeedUrl}?_ts=${Date.now()}`;

    console.log("🔁 Setting img.src to:", freshUrl);
    img.src = ""; // Clear previous
    setTimeout(() => {
      img.src = freshUrl;
    }, 50);
  }, 300); // 🕒 wait 300ms to let Dialog content mount

  return () => clearTimeout(delay);
}, [open, cameraFeedUrl, useCaseName]);




  // Redraw canvas
  useEffect(() => {
    if (imageLoaded) {
      redrawCanvas();
    }
  }, [roiShapes, currentShape, imageLoaded, selectedROIIndex, selectedColor]);

  const redrawCanvas = useCallback(() => {11
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    console.log("🖼️ redrawCanvas() called — imageLoaded:", imageLoaded);


    if (!canvas || !ctx || !img || !imageLoaded) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch {
      return;
    }

    roiShapes.forEach((shape, index) => {
      const isSelected = index === selectedROIIndex;
      drawShape(ctx, shape, shape.color, index + 1, false, isSelected);
    });

    if (currentShape && currentShape.points.length > 0) {
      drawShape(ctx, currentShape, selectedColor, null, true, false);
    }
  }, [roiShapes, currentShape, imageLoaded, selectedROIIndex, selectedColor]);

  const drawShape = (
    ctx: CanvasRenderingContext2D,
    shape: ROIShape,
    color: string,
    label: number | null,
    _isActive: boolean,
    isSelected: boolean
  ) => {
    const points = shape.points;
    if (points.length === 0) return;

    ctx.save();


    // Utility: convert hex to RGBA for matching tint
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const isExclude = shape.mode === 'exclude';

    // Use shape’s color for border (blue highlight if selected)
    ctx.strokeStyle = isSelected ? '#0066ff' : color;
    ctx.lineWidth = isSelected ? 4 : 2;

    // Exclude = dashed, Include = solid
    ctx.setLineDash(isExclude ? [8, 4] : []);

    // Fill uses the same color as the border, just with transparency
    // Slightly lighter for exclude, more visible for include
    ctx.fillStyle = hexToRgba(color, isExclude ? 0.18 : 0.25);



    if (shape.type === 'rectangle' && points.length === 2) {
      const width = points[1].x - points[0].x;
      const height = points[1].y - points[0].y;
      ctx.strokeRect(points[0].x, points[0].y, width, height);
      ctx.fillRect(points[0].x, points[0].y, width, height);
    } else if ((shape.type === 'polygon' || shape.type === 'freehand') && points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point, index) => {
        if (index > 0) ctx.lineTo(point.x, point.y);
      });
      if (shape.completed) {
        ctx.closePath();
        ctx.fill();
      }
      ctx.stroke();
    }

    if (shape.type === 'polygon' && !shape.completed) {
      points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = index === 0 ? '#ffffff' : color;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Label with mode indicator
    if (points.length > 0) {
      const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
      const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

      ctx.setLineDash([]);
      ctx.font = 'bold 12px Arial';
      const labelText = `${isExclude ? '❌' : '✓'} ${shape.name || `ROI ${label ?? ''}`}`;
      const padding = 8;
      const textWidth = ctx.measureText(labelText).width + padding;

      ctx.fillStyle = isExclude ? 'rgba(255, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(centerX - textWidth / 2, centerY - 12, textWidth, 24);

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, centerX, centerY);
    }

    ctx.restore();
  };

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const isPointInShape = (point: Point, shape: ROIShape): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    if (shape.type === 'rectangle' && shape.points.length === 2) {
      const [p1, p2] = shape.points;
      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);
      return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
    } else if ((shape.type === 'polygon' || shape.type === 'freehand') && shape.completed) {
      ctx.beginPath();
      ctx.moveTo(shape.points[0].x, shape.points[0].y);
      shape.points.forEach((p, index) => {
        if (index > 0) ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      return ctx.isPointInPath(point.x, point.y);
    }
    return false;
  };

  const addToHistory = (newShapes: ROIShape[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newShapes]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasCoordinates(e);

    if (drawingTool === 'rectangle') {
      setCurrentShape({
        type: 'rectangle',
        points: [point],
        completed: false,
        color: getNextColor(),
        name: selectedLabel,
        mode: roiMode,
      });
      setIsDrawing(true);
    } else if (drawingTool === 'freehand') {
      setCurrentShape({
        type: 'freehand',
        points: [point],
        completed: false,
        color: getNextColor(),
        name: selectedLabel,
        mode: roiMode,
      });
      setIsDrawing(true);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentShape) return;
    const point = getCanvasCoordinates(e);

    if (drawingTool === 'rectangle') {
      setCurrentShape({
        ...currentShape,
        points: [currentShape.points[0], point],
      });
    } else if (drawingTool === 'freehand') {
      const lastPoint = currentShape.points[currentShape.points.length - 1];
      const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      if (distance >= 3) {
        setCurrentShape({
          ...currentShape,
          points: [...currentShape.points, point],
        });
      }
    }
  };

  const handleCanvasMouseUp = () => {
    if (!currentShape) return;

    if (drawingTool === 'rectangle' || drawingTool === 'freehand') {
      if (currentShape.points.length >= 2) {
        const completedShape = { ...currentShape, completed: true };
        const newShapes = [...roiShapes, completedShape];
        setRoiShapes(newShapes);
        addToHistory(newShapes);
      }
      setCurrentShape(null);
      setIsDrawing(false);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) return;

    const point = getCanvasCoordinates(e);

    if (drawingTool !== 'polygon' && !currentShape) {
      for (let i = roiShapes.length - 1; i >= 0; i--) {
        if (isPointInShape(point, roiShapes[i])) {
          setSelectedROIIndex(i);
          return;
        }
      }
      setSelectedROIIndex(null);
      return;
    }

    if (drawingTool !== 'polygon') return;

    if (!currentShape) {
      setCurrentShape({
        type: 'polygon',
        points: [point],
        completed: false,
        color: getNextColor(),
        name: selectedLabel,
        mode: roiMode,
      });
    } else {
      const firstPoint = currentShape.points[0];
      const distance = Math.hypot(point.x - firstPoint.x, point.y - firstPoint.y);

      const canvas = canvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      const scaleX = canvas ? canvas.width / (rect!.width || 1) : 1;
      const closeThreshold = 15 * scaleX;

      if (distance < closeThreshold && currentShape.points.length >= 3) {
        const completedShape = { ...currentShape, completed: true };
        const newShapes = [...roiShapes, completedShape];
        setRoiShapes(newShapes);
        addToHistory(newShapes);
        setCurrentShape(null);
      } else {
        setCurrentShape({
          ...currentShape,
          points: [...currentShape.points, point],
        });
      }
    }
  };

  const handleCanvasContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const point = getCanvasCoordinates(e);

    for (let i = roiShapes.length - 1; i >= 0; i--) {
      if (isPointInShape(point, roiShapes[i])) {
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          roiIndex: i,
        });
        setSelectedROIIndex(i);
        return;
      }
    }
  };

  const handleDeleteROI = (index: number) => {
    const newShapes = roiShapes.filter((_, i) => i !== index);
    setRoiShapes(newShapes);
    addToHistory(newShapes);
    if (selectedROIIndex === index) {
      setSelectedROIIndex(null);
    }
  };

  const handleROINameChange = (index: number, newName: string) => {
    const newShapes = roiShapes.map((shape, i) =>
      i === index ? { ...shape, name: newName } : shape
    );
    setRoiShapes(newShapes);
  };

  const handleROIColorChange = (index: number, newColor: string) => {
    const newShapes = roiShapes.map((shape, i) =>
      i === index ? { ...shape, color: newColor } : shape
    );
    setRoiShapes(newShapes);
    addToHistory(newShapes);
  };

  const handleROIModeToggle = (index: number) => {
    const newShapes = roiShapes.map((shape, i) =>
      i === index ? { ...shape, mode: shape.mode === 'include' ? 'exclude' : 'include' } : shape
    );
    // setRoiShapes(newShapes);
    // addToHistory(newShapes);
  };

  const editFieldRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (editingNameIndex !== null && editFieldRef.current) {
      editFieldRef.current.focus();
      editFieldRef.current.select();
    }
  }, [editingNameIndex]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '65vw',
          height: '90vh',
          maxWidth: '1800px',
          m: 2,
          bgcolor: 'white',
        },
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%', display: 'flex' }}>
        <Box sx={{ flex: 1, p: 2, bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" color="black">
              Configure ROI - {useCaseName}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={`${roiShapes.length} ROI(s)`} color={roiShapes.length > 0 ? 'success' : 'default'} size="small" />
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <ToggleButtonGroup
              value={drawingTool}
              exclusive
              onChange={(_, newTool) => {
                if (newTool) {
                  setDrawingTool(newTool);
                  setCurrentShape(null);
                  setIsDrawing(false);
                }
              }}
              size="small"
            >
              <ToggleButton value="rectangle">
                <RectangleIcon sx={{ mr: 0.5, fontSize: 18 }} />
                <Typography variant="caption">Rectangle</Typography>
              </ToggleButton>
              <ToggleButton value="polygon">
                <PolygonIcon sx={{ mr: 0.5, fontSize: 18 }} />
                <Typography variant="caption">Polygon</Typography>
              </ToggleButton>
              <ToggleButton value="freehand">
                <FreehandIcon sx={{ mr: 0.5, fontSize: 18 }} />
                <Typography variant="caption">Freehand</Typography>
              </ToggleButton>
            </ToggleButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'grey.300' }} />

            {/* Mode Dropdown */}
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => setModeMenuAnchor(e.currentTarget)}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                textTransform: 'none',
                minWidth: 100,
                borderColor: roiMode === 'include' ? 'success.main' : 'error.main',
                color: roiMode === 'include' ? 'success.main' : 'error.main',
                '&:hover': {
                  borderColor: roiMode === 'include' ? 'success.dark' : 'error.dark',
                  bgcolor: roiMode === 'include' ? 'success.light' : 'error.light',
                },
              }}
            >
              {roiMode === 'include' ? (
                <>
                  <IncludeIcon sx={{ mr: 0.5, fontSize: 16 }} /> Include
                </>
              ) : (
                <>
                  <ExcludeIcon sx={{ mr: 0.5, fontSize: 16 }} /> Exclude
                </>
              )}
            </Button>

            {/* Label Dropdown */}
            <TextField
              select
              size="small"
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              variant="outlined"
              sx={{ minWidth: 140, '& select': { fontSize: '0.8rem' } }}
            >
              {(USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default).map((labelOption) => (
                <MenuItem key={labelOption} value={labelOption}>
                  {labelOption}
                </MenuItem>
              ))}
            </TextField>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'grey.300' }} />

            <Tooltip title="Undo">
              <span>
                <IconButton
                  onClick={() => {
                    if (historyIndex > 0) {
                      setHistoryIndex(historyIndex - 1);
                      setRoiShapes(history[historyIndex - 1]);
                      setCurrentShape(null);
                    }
                  }}
                  disabled={historyIndex === 0}
                  size="small"
                >
                  <UndoIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Redo">
              <span>
                <IconButton
                  onClick={() => {
                    if (historyIndex < history.length - 1) {
                      setHistoryIndex(historyIndex + 1);
                      setRoiShapes(history[historyIndex + 1]);
                    }
                  }}
                  disabled={historyIndex === history.length - 1}
                  size="small"
                >
                  <RedoIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Clear All">
              <IconButton
                onClick={() => {
                  setRoiShapes([]);
                  setCurrentShape(null);
                  setHistory([[]]);
                  setHistoryIndex(0);
                }}
                size="small"
                color="error"
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            ref={containerRef}
            sx={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              border: '2px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            {/* <img ref={imgRef} src="" alt="Camera Feed" style={{ display: 'none' }} /> */}
            <img
              ref={imgRef}
              src="img/siteimage.jpg"
              
              // src="https://plus.unsplash.com/premium_photo-1661933050836-3f9e3d7eda61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjdG9yeXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
              alt="Camera Feed"
              onLoad={() => console.log("✅ Direct image loaded")}
              // style={{ display: 'none' }}
              style={{
                visibility: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 'auto',
              }}
            />
            

            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              style={{
                cursor: 'crosshair',
                display: 'block',
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onClick={handleCanvasClick}
              onContextMenu={handleCanvasContextMenu}
            />

            {!imageLoaded && (
              <Typography sx={{ position: 'absolute', color: 'grey.500', fontSize: '1rem' }}>
                Loading camera feed...
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 2, color: 'grey.700', fontSize: '0.75rem' }}>
            <Typography variant="caption">
              <strong>Rectangle:</strong> Click & drag | <strong>Polygon:</strong> Click points, click near start to close |{' '}
              <strong>Freehand:</strong> Click & drag | <strong>Right-click ROI:</strong> Edit menu
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: '180px',
            borderLeft: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
          }}
        >
          <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}>
              <PaletteIcon fontSize="small" />
              Color
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.5, mt: 0.5 }}>
              {ROI_COLORS.map((color) => (
                <Box
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: color,
                    border: selectedColor === color ? '3px solid #0066ff' : '1px solid grey',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.1)' },
                    transition: 'transform 0.2s',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              ROIs ({roiShapes.length})
            </Typography>
            <List dense sx={{ p: 0 }}>
              {roiShapes.map((shape, index) => (
                <Paper
                  key={index}
                  elevation={selectedROIIndex === index ? 2 : 0}
                  sx={{
                    mb: 0.5,
                    p: 0.5,
                    border: '1px solid',
                    borderColor: selectedROIIndex === index ? 'primary.main' : 'divider',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => setSelectedROIIndex(index === selectedROIIndex ? null : index)}
                >
                  <ListItem disablePadding sx={{ gap: 0.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', width: '100%' }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: shape.color,
                          borderRadius: '3px',
                          border: '1px solid grey',
                          flexShrink: 0,
                        }}
                      />
                      {editingNameIndex === index ? (
                        <TextField
                          select
                          inputRef={index === editingNameIndex ? editFieldRef : null}
                          value={shape.name}
                          onChange={(e) => {
                            handleROINameChange(index, e.target.value);
                            setEditingNameIndex(null);
                          }}
                          onBlur={() => setEditingNameIndex(null)}
                          SelectProps={{ native: true }}
                          size="small"
                          fullWidth
                          variant="standard"
                          sx={{
                            fontSize: '0.75rem',
                            '& select': { fontSize: '0.75rem', padding: '2px 4px' },
                          }}
                        >
                          {(USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default).map((labelOption) => (
                            <option key={labelOption} value={labelOption}>
                              {labelOption}
                            </option>
                          ))}
                        </TextField>
                      ) : (
                        <ListItemText
                          primary={shape.name}
                          secondary={shape.mode === 'include' ? 'Include' : 'Exclude'}
                          primaryTypographyProps={{
                            variant: 'caption',
                            sx: { fontWeight: 500, fontSize: '0.7rem' },
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            sx: {
                              fontSize: '0.6rem',
                              color: shape.mode === 'include' ? 'success.main' : 'error.main',
                              fontWeight: 500,
                            },
                          }}
                          sx={{ m: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingNameIndex(index);
                          }}
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteROI(index);
                        }}
                        sx={{ p: 0.25 }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  </ListItem>
                </Paper>
              ))}
            </List>
            {roiShapes.length === 0 && (
              <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ display: 'block', mt: 2 }}>
                No ROIs yet
              </Typography>
            )}
          </Box>

          <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                if (roiShapes.length === 0) {
                  alert('Please draw at least one ROI region before saving.');
                  return;
                }
                onSave(roiShapes);
                onClose();
              }}
              disabled={roiShapes.length === 0}
              sx={{ mb: 0.5, fontSize: '0.75rem', py: 0.5 }}
              size="small"
            >
              Save ({roiShapes.length})
            </Button>
            <Button fullWidth variant="outlined" onClick={onClose} sx={{ fontSize: '0.75rem', py: 0.5 }} size="small">
              Cancel
            </Button>
          </Box>
        </Box>

        {/* Mode Selection Menu */}
        <Menu anchorEl={modeMenuAnchor} open={Boolean(modeMenuAnchor)} onClose={() => setModeMenuAnchor(null)}>
          <MenuItem
            onClick={() => {
              setRoiMode('include');
              setModeMenuAnchor(null);
            }}
            selected={roiMode === 'include'}
          >
            <IncludeIcon fontSize="small" style={{ marginRight: 4 }} />
            <Typography variant="body2">Include (Detect Zone)</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRoiMode('exclude');
              setModeMenuAnchor(null);
            }}
            selected={roiMode === 'exclude'}
          >
            <ExcludeIcon fontSize="small" style={{ marginRight: 4 }} />
            <Typography variant="body2">Exclude (Ignore Zone)</Typography>
          </MenuItem>
        </Menu>

        {/* ROI Context Menu */}
        <Menu
          open={contextMenu !== null}
          onClose={() => setContextMenu(null)}
          anchorReference="anchorPosition"
          anchorPosition={contextMenu ? { top: contextMenu.y, left: contextMenu.x } : undefined}
        >
          <MenuItem
            onClick={() => {
              if (contextMenu) {
                setLabelMenu({
                  x: contextMenu.x,
                  y: contextMenu.y,
                  roiIndex: contextMenu.roiIndex,
                });
                setContextMenu(null);
              }
            }}
          >
            <EditIcon fontSize="small" style={{ marginRight: 4 }} />
            Edit Label
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (contextMenu !== null) {
                handleROIModeToggle(contextMenu.roiIndex);
                setTimeout(() => setContextMenu(null), 50);
              }
              setTimeout(() => redrawCanvas(), 100);
            }}
          >
            <ToggleIcon fontSize="small" style={{ marginRight: 4 }} />
            Toggle Include/Exclude
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (contextMenu !== null) {
                const currentIndex = ROI_COLORS.indexOf(roiShapes[contextMenu.roiIndex].color);
                const nextColor = ROI_COLORS[(currentIndex + 1) % ROI_COLORS.length];
                handleROIColorChange(contextMenu.roiIndex, nextColor);
              }
              setContextMenu(null);
            }}
          >
            <PaletteIcon fontSize="small" style={{ marginRight: 4 }} />
            Change Color
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (contextMenu !== null) handleDeleteROI(contextMenu.roiIndex);
              setContextMenu(null);
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon fontSize="small" style={{ marginRight: 4 }} />
            Delete ROI
          </MenuItem>
        </Menu>

        {/* Label Picker Menu (separate, anchored at cursor) */}
        <Menu
          open={labelMenu !== null}
          onClose={() => setLabelMenu(null)}
          anchorReference="anchorPosition"
          anchorPosition={labelMenu ? { top: labelMenu.y, left: labelMenu.x } : undefined}
        >
          {(USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default).map((opt) => (
            <MenuItem
              key={opt}
              selected={labelMenu !== null && roiShapes[labelMenu.roiIndex]?.name === opt}
              onClick={() => {
                if (labelMenu !== null) handleROINameChange(labelMenu.roiIndex, opt);
                setLabelMenu(null);
              }}
            >
              {opt}
            </MenuItem>
          ))}
        </Menu>
      </DialogContent>
    </Dialog>
  );
};

export default RoiSelectionModal;
