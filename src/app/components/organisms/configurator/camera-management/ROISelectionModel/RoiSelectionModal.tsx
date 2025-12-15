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
  Drawer,
  useTheme,
  useMediaQuery,
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
  Menu as MenuIcon,
} from '@mui/icons-material';

export type DrawingTool = 'rectangle' | 'polygon' | 'freehand';

export interface Point {
  x: number;
  y: number;
}

export interface ROIShape {
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

/* ----------------------------- Constants ----------------------------- */

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

/* ----------------------------- Component ----------------------------- */

const RoiSelectionModal: React.FC<RoiSelectionModalProps> = ({
  open,
  onClose,
  cameraFeedUrl,
  useCaseName,
  existingROI,
  onSave,
}) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  // Responsive drawer/sidebar state
  // const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // const drawerWidth = 200;

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

  // Drawer state for small screens
  const [drawerOpen, setDrawerOpen] = useState(false);

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

      const first = (USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default)[0];
      setSelectedLabel(first);
    }
  }, [open, useCaseName, existingROI]);

  // Responsive canvas loader: recalculates width/height on open and on resize
const recalcCanvasSize = useCallback(() => {
  const img = imgRef.current;
  const canvas = canvasRef.current;
  const container = containerRef.current;
  if (!img || !canvas || !container) return;

  const containerRect = container.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  if (containerHeight < 50) {
  console.warn("Canvas skipped: container not ready yet.");
  return;
}

  
  // 🔥 Force 16:9 aspect ratio calculation
  const targetAspectRatio = 16 / 9;
  const containerAspectRatio = containerWidth / containerHeight;
  
  let newCanvasWidth, newCanvasHeight;
  
  if (containerAspectRatio > targetAspectRatio) {
    // Container is wider than 16:9 - fit to height
    newCanvasHeight = containerHeight;
    newCanvasWidth = containerHeight * targetAspectRatio;
  } else {
    // Container is taller than 16:9 - fit to width
    newCanvasWidth = containerWidth;
    newCanvasHeight = containerWidth / targetAspectRatio;
  }

  // 🔥 Ensure we don't exceed container bounds
  newCanvasWidth = Math.min(newCanvasWidth, containerWidth);
  newCanvasHeight = Math.min(newCanvasHeight, containerHeight);

  canvas.width = newCanvasWidth;
  canvas.height = newCanvasHeight;
  setCanvasWidth(newCanvasWidth);
  setCanvasHeight(newCanvasHeight);
}, []);

useEffect(() => {
  if (!open) return;

  const img = imgRef.current;
  const canvas = canvasRef.current;
  if (!img || !canvas) return;

  const freshUrl =
  cameraFeedUrl && cameraFeedUrl.trim() !== ""
    ? `${cameraFeedUrl}${cameraFeedUrl.includes("?") ? "&" : "?"}_ts=${Date.now()}`
    : "/img/siteimage.jpg";   // <-- ensure slash is present

 console.log("🔄 Fresh URL for load:", freshUrl);
  setImageLoaded(false);
 

  img.onload = () => {
    console.log("✅ Image loaded successfully");
    setImageLoaded(true);

    setTimeout(() => {
      recalcCanvasSize();
      requestAnimationFrame(() => {
        const ctx = canvas.getContext("2d");
        if (ctx && img) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
    }, 80);
  };

  img.onerror = (err) => {
    console.error("❌ Image failed:", freshUrl, err);
    setImageLoaded(false);
  };

  //  Fixed Reset
  img.src = "/img/siteimage.jpg";
setTimeout(() => {
  img.src = freshUrl;
}, 40);


  return () => {
    img.onload = null;
    img.onerror = null;
  };
}, [open, cameraFeedUrl, recalcCanvasSize]);

  // Redraw canvas on changes
  useEffect(() => {
    if (imageLoaded) {
      redrawCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roiShapes, currentShape, imageLoaded, selectedROIIndex, selectedColor]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (!canvas || !ctx || !img || !imageLoaded) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch {
      // ignore
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

    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const isExclude = shape.mode === 'exclude';

    ctx.strokeStyle = isSelected ? '#0066ff' : color;
    ctx.lineWidth = isSelected ? 4 : 2;
    ctx.setLineDash(isExclude ? [8, 4] : []);
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

  // const handleROIModeToggle = (index: number) => {
    // const newShapes = roiShapes.map((shape, i) =>
    //   i === index ? { ...shape, mode: shape.mode === 'include' ? 'exclude' : 'include' } : shape
    // );
    // setRoiShapes(newShapes);
    // addToHistory(newShapes);
  // };

  const editFieldRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (editingNameIndex !== null && editFieldRef.current) {
      editFieldRef.current.focus();
      editFieldRef.current.select();
    }
  }, [editingNameIndex]);

  /* ----------------------------- Render ----------------------------- */

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: '95%',
            md: '95%',
            lg: '90%',
            xl: '1200px',   // 🔥 reduce max width so canvas touches sidebar with NO GAP
          },
          maxWidth: '1300px', // 🔥 previously 1600px — too large
          height: { xs: '100vh', sm: '95vh', md: '90vh' },
          m: { xs: 0, sm: 1, md: 2 },
          bgcolor: 'white'
        }
      }}

    >
      
      <DialogContent
        sx={{
          p: 0,
          gap: 0,
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
          
        }}
      >
        {/* Left area: Canvas and toolbar */}
        <Box
          sx={{
            flex: '1 1 auto',
            p: { xs: 1, sm: 2 },
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minWidth: 0, // important to allow shrinking
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 1, sm: 2 } }}>
            {/* Drawer Toggle Button ON SMALL SCREENS */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="black" sx={{ fontSize: { xs: '0.95rem', sm: '1rem', md: '1.125rem' } }}>
              Configure ROI - {useCaseName}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip
                label={`${roiShapes.length} ROI(s)`}
                color={roiShapes.length > 0 ? 'success' : 'default'}
                size="small"
              />
              <IconButton onClick={onClose} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 0.5, sm: 1, md: 2 },
              mb: { xs: 1, sm: 2 },
              alignItems: 'center',
            }}
          >
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
              sx={{
                '& .MuiToggleButton-root': {
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                  px: { xs: 0.5, sm: 1 },
                },
              }}
            >
              <ToggleButton value="rectangle">
                <RectangleIcon sx={{ mr: { xs: 0, sm: 0.5 }, fontSize: { xs: 16, sm: 18 } }} />
                <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'inline' } }}>Rectangle</Typography>
              </ToggleButton>
              <ToggleButton value="polygon">
                <PolygonIcon sx={{ mr: { xs: 0, sm: 0.5 }, fontSize: { xs: 16, sm: 18 } }} />
                <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'inline' } }}>Polygon</Typography>
              </ToggleButton>
              <ToggleButton value="freehand">
                <FreehandIcon sx={{ mr: { xs: 0, sm: 0.5 }, fontSize: { xs: 16, sm: 18 } }} />
                <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'inline' } }}>Freehand</Typography>
              </ToggleButton>
            </ToggleButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'grey.300', display: { xs: 'none', sm: 'block' } }} />

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
                fontSize: { xs: '0.72rem', sm: '0.8rem' },
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

            <TextField
              select
              size="small"
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              variant="outlined"
              sx={{
                minWidth: 100,
                '& .MuiSelect-select': {
                  fontSize: { xs: '0.72rem', sm: '0.8rem' }, // 🔥 Match button font size
                  py: '8px', // 🔥 Adjust padding to match button height
                },
                '& .MuiOutlinedInput-root': {
                  height: '35px', // 🔥 Match button height
                }
              }}
            >
              {(USE_CASE_LABELS[useCaseName] || USE_CASE_LABELS.default).map((labelOption) => (
                <MenuItem key={labelOption} value={labelOption}>
                  {labelOption}
                </MenuItem>
              ))}
            </TextField>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'grey.300', display: { xs: 'none', sm: 'block' } }} />

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
    flex: '1 1 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    bgcolor: '#f5f5f5',
    borderRadius: 1,
    border: '2px solid #e0e0e0',
    // 🔥 Dynamic height based on 16:9 aspect ratio
    height: { xs: '50vh', sm: '60vh', md: '70vh' },
    maxHeight: { xs: '50vh', sm: '60vh', md: '70vh' },
  }}
>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    ref={imgRef}
    alt="Camera Feed"
    style={{
      display: 'none', // 🔥 Hide instead of visibility hidden
    }}
  />
  
  <canvas
    ref={canvasRef}
    width={canvasWidth}
    height={canvasHeight}
    style={{
      cursor: 'crosshair',
      // 🔥 Fill the container while maintaining aspect ratio
      width: '100%',
      height: '100%',
      objectFit: 'contain', // This ensures 16:9 ratio without gaps
      display: 'block', // Remove any inline spacing
    }}
    onMouseDown={handleCanvasMouseDown}
    onMouseMove={handleCanvasMouseMove}
    onMouseUp={handleCanvasMouseUp}
    onClick={handleCanvasClick}
    onContextMenu={handleCanvasContextMenu}
  />

  {!imageLoaded && (
    <Typography sx={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      color: 'grey.500', 
      fontSize: '1rem' 
    }}>
      Loading camera feed...
    </Typography>
  )}
</Box>
          <Box sx={{ mt: { xs: 1, sm: 2 }, color: 'grey.700', fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
            <Typography variant="caption">
              <strong>Rectangle:</strong> Click & drag | <strong>Polygon:</strong> Click points, click near start to close |{' '}
              <strong>Freehand:</strong> Click & drag | <strong>Right-click ROI:</strong> Edit menu
            </Typography>
          </Box>
        </Box>

        {/* Persistent sidebar for md+ */}
        <Box
          sx={{
            width: { xs: '0px', md: '240px' },
            flex: { xs: '0 0 0px', md: '0 0 240px' },
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            borderLeft: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
            overflow: 'hidden',
          }}
        >

          <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, fontSize: '0.78rem' }}>
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
                    '&:hover': { transform: 'scale(1.05)' },
                    transition: 'transform 0.15s',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.78rem' }}>
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
                            sx: { fontWeight: 500, fontSize: '0.75rem' },
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            sx: {
                              fontSize: '0.65rem',
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
              <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ display: 'block', mt: 2, fontSize: '0.75rem' }}>
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
              sx={{ mb: 0.5, fontSize: '0.85rem', py: 0.5 }}
              size="small"
            >
              Save ({roiShapes.length})
            </Button>
            <Button fullWidth variant="outlined" onClick={onClose} sx={{ fontSize: '0.85rem', py: 0.5 }} size="small">
              Cancel
            </Button>
          </Box>
        </Box>

        {/* Drawer for small screens (opens from right) */}
        {!isMdUp && (
 <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  ModalProps={{ keepMounted: true }}
  PaperProps={{
    sx: {
      width: { xs: '45vw', sm: '200px' }, // 🔥 Further reduced width
      maxWidth: '200px',
      height: '100vh',
      top: 0,
      margin: 0,
      borderRadius: { xs: 0, sm: '0 8px 8px 0' },
      boxShadow: 6,
    }
  }}
  sx={{ zIndex: 1300 }}
>
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'white', p: 0.5 }}> {/* 🔥 Reduced padding */}

    {/* Header - Even more compact */}
    <Box sx={{
      p: 0.75,
      borderBottom: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Typography variant="subtitle2" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>ROI List</Typography>
      <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ p: 0.25 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>

    {/* Color Palette - Even more compact */}
    <Box sx={{ p: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, fontSize: '0.7rem' }}>
        <PaletteIcon fontSize="small" />
        Color
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 20px)', // 🔥 Even smaller color boxes
        gap: '8px', // 🔥 Further reduced gap
        mt: 0.75,
        justifyContent: 'center'
      }}>
        {ROI_COLORS.map((color) => (
          <Box
            key={color}
            onClick={() => setSelectedColor(color)}
            sx={{
              width: 20,
              height: 20,
              bgcolor: color,
              border: selectedColor === color ? '2px solid #0066ff' : '1px solid grey',
              borderRadius: '2px',
              cursor: 'pointer',
              '&:hover': { transform: 'scale(1.05)' },
              transition: 'transform 0.12s',
            }}
          />
        ))}
      </Box>
    </Box>

    {/* ROIs List - Even more compact */}
    <Box sx={{ flex: 1, overflow: 'auto', p: 0.75 }}>
      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', display: 'block', mb: 0.75 }}>
        ROIs ({roiShapes.length})
      </Typography>
      <List dense sx={{ p: 0 }}>
        {roiShapes.map((shape, index) => (
          <Paper
            key={index}
            elevation={selectedROIIndex === index ? 2 : 0}
            sx={{
              mb: 0.25,
              p: 0.25,
              border: '1px solid',
              borderColor: selectedROIIndex === index ? 'primary.main' : 'divider',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => {
              setSelectedROIIndex(index === selectedROIIndex ? null : index);
            }}
          >
            <ListItem disablePadding sx={{ gap: 0.25 }}>
              <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center', width: '100%' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: shape.color,
                    borderRadius: '1px',
                    border: '1px solid grey',
                    flexShrink: 0,
                  }}
                />
                <ListItemText
                  primary={shape.name}
                  secondary={shape.mode === 'include' ? 'Include' : 'Exclude'}
                  primaryTypographyProps={{
                    variant: 'caption',
                    sx: { fontWeight: 500, fontSize: '0.65rem' }, // 🔥 Even smaller
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    sx: {
                      fontSize: '0.55rem', // 🔥 Even smaller
                      color: shape.mode === 'include' ? 'success.main' : 'error.main',
                      fontWeight: 500,
                    },
                  }}
                  sx={{ m: 0 }}
                />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteROI(index);
                  }}
                  sx={{ p: 0.125, minWidth: 'auto' }}
                >
                  <DeleteIcon sx={{ fontSize: 10 }} /> {/* 🔥 Even smaller icon */}
                </IconButton>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
      {roiShapes.length === 0 && (
        <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ display: 'block', mt: 1.5, fontSize: '0.65rem' }}>
          No ROIs yet
        </Typography>
      )}
    </Box>

    {/* Buttons - Even more compact */}
    <Box sx={{ p: 0.75, borderTop: '1px solid', borderColor: 'divider' }}>
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
        sx={{ 
          mb: 0.5, 
          fontSize: '0.7rem', // 🔥 Even smaller
          py: 0.375, // 🔥 Reduced padding
          minHeight: '32px' // 🔥 Smaller button height
        }}
        size="small"
      >
        Save ({roiShapes.length})
      </Button>
      <Button 
        fullWidth 
        variant="outlined" 
        onClick={() => setDrawerOpen(false)} 
        sx={{ 
          fontSize: '0.7rem', 
          py: 0.375,
          minHeight: '32px'
        }} 
        size="small"
      >
        Close
      </Button>
    </Box>
  </Box>
</Drawer>
        )}

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
                // handleROIModeToggle(contextMenu.roiIndex);
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

        {/* Label Picker Menu */}
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
