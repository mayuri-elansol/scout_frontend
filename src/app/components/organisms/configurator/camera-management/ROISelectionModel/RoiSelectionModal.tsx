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
  CircularProgress,
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
import { ROIShape } from '@/app/types/roi';

type DrawingTool = 'rectangle' | 'polygon' | 'freehand';

interface Point {
  x: number;
  y: number;
}

// interface ROIShape {
//   type: DrawingTool;
//   points: Point[];
//   completed: boolean;
//   color: string;
//   name: string;
//   mode: 'include' | 'exclude';
// }

interface RoiSelectionModalProps {
  open: boolean;
  onClose: () => void;
  cameraFeedUrl: string;
  useCaseName: string;
  existingROI?: ROIShape[];
  onSave: (roiShapes: ROIShape[]) => void;
  labels: string[];
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



/* ----------------------------- Component ----------------------------- */

const RoiSelectionModal: React.FC<RoiSelectionModalProps> = ({
  open,
  onClose,
  cameraFeedUrl,
  useCaseName,
  existingROI,
  onSave,
  labels
}) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const prevUseCaseRef = useRef<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDrawingRef = useRef(false);


  const [drawingTool, setDrawingTool] = useState<DrawingTool>('rectangle');
  const [roiMode, setRoiMode] = useState<'include' | 'exclude'>('include');
  const [roiShapes, setRoiShapes] = useState<ROIShape[]>([]);
  const [currentShape, setCurrentShape] = useState<ROIShape | null>(null);
  const currentShapeRef = useRef<ROIShape | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string>(ROI_COLORS[0]);
  const nextColorRef = useRef(0);
  const getNextColor = useCallback(() => {
    const idx = nextColorRef.current % ROI_COLORS.length;
    nextColorRef.current = (nextColorRef.current + 1) % ROI_COLORS.length;
    return ROI_COLORS[idx];
  }, []);

  const normalizeROI = (shapes: ROIShape[], canvas: HTMLCanvasElement) => {
  return shapes.map(shape => ({
    ...shape,
    points: shape.points.map(p => ({
      x: +(p.x / canvas.width).toFixed(6),
      y: +(p.y / canvas.height).toFixed(6)
    }))
  }));

 

};

  const [selectedROIIndex, setSelectedROIIndex] = useState<number | null>(null);
  const [editingNameIndex, setEditingNameIndex] = useState<number | null>(null);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; roiIndex: number } | null>(null);
  const [labelMenu, setLabelMenu] = useState<{ x: number; y: number; roiIndex: number } | null>(null);
  const [modeMenuAnchor, setModeMenuAnchor] = useState<null | HTMLElement>(null);

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const [history, setHistory] = useState<ROIShape[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

   const denormalizeROI = (
  shapes: ROIShape[],
  canvas: HTMLCanvasElement
): ROIShape[] => {
  return shapes.map(shape => ({
    ...shape,
    points: shape.points.map(p => ({
      x: +(p.x * canvas.width).toFixed(2),
      y: +(p.y * canvas.height).toFixed(2),
    })),
    completed: true,
  }));
};


  useEffect(() => {
  if (!open) return;

  if (labels && labels.length > 0) {
    setSelectedLabel(labels[0]);
  } else {
    setSelectedLabel('ROI');
  }
}, [labels, open]);


  
  // Image ref for loading
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load existing ROI when modal opens
  // useEffect(() => {
  //   if (open) {
  //     const roiToLoad = existingROI || [];
  //     setRoiShapes(roiToLoad);
  //     setHistory([roiToLoad]);
  //     setHistoryIndex(0);
  //     setCurrentShape(null);
  //     currentShapeRef.current = null;
  //     setIsDrawing(false);
  //     setSelectedROIIndex(null);
  //     setEditingNameIndex(null);
  //     // Don't reset imageLoaded - let the image loading effect handle it

  //     const first = labels.length > 0 ? labels[0] : 'ROI';
  //     setSelectedLabel(first);
  //   }
  // }, [open, useCaseName, existingROI]);

   
  useEffect(() => {
  if (!open) return;

  const canvas = canvasRef.current;
  if (!canvas || !imageLoaded) return;

  if (existingROI && existingROI.length > 0) {
    const denormalized = denormalizeROI(existingROI, canvas);
    setRoiShapes(denormalized);
    setHistory([denormalized]);
  } else {
    setRoiShapes([]);
    setHistory([[]]);
  }

  setHistoryIndex(0);
  setCurrentShape(null);
  currentShapeRef.current = null;
  setIsDrawing(false);
  setSelectedROIIndex(null);
  setEditingNameIndex(null);
   // 🔥 FORCE REDRAW AFTER ROI LOAD
  requestAnimationFrame(() => drawCanvas());
}, [open, existingROI, imageLoaded]);

  

  // Calculate canvas size based on container
   const recalcCanvasSize = useCallback(() => {
    //  if (isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    if (containerHeight < 50) return;

    const targetAspectRatio = 16 / 9;
    const containerAspectRatio = containerWidth / containerHeight;

    let newCanvasWidth, newCanvasHeight;

    if (containerAspectRatio > targetAspectRatio) {
      newCanvasHeight = containerHeight;
      newCanvasWidth = containerHeight * targetAspectRatio;
    } else {
      newCanvasWidth = containerWidth;
      newCanvasHeight = containerWidth / targetAspectRatio;
    }

    newCanvasWidth = Math.min(newCanvasWidth, containerWidth);
    newCanvasHeight = Math.min(newCanvasHeight, containerHeight);

    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;
    
    setCanvasWidth(newCanvasWidth);
    setCanvasHeight(newCanvasHeight);
  }, []);


useEffect(() => {
  if (!open || !imageLoaded) return;
  if (isDrawingRef.current) return;

  drawCanvas();
}, [roiShapes, selectedROIIndex, selectedColor, imageLoaded, open]);

  // Helper function to draw shapes  
  const drawShape = (ctx: CanvasRenderingContext2D, shape: ROIShape, color: string, label: number | null, _isActive: boolean, isSelected: boolean) => {
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

    // Draw polygon points if not completed
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

    // Draw label
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

  // ✅ FIX: Separate function to draw canvas content
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image if loaded
    if (imageLoaded && imageRef.current) {
      try {
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        console.error('Error drawing image:', error);
      }
    }

    // Draw all ROI shapes
    roiShapes.forEach((shape, index) => {
      const isSelected = index === selectedROIIndex;
      drawShape(ctx, shape, shape.color, index + 1, false, isSelected);
    });

    // Draw current shape being drawn
    if (currentShape && currentShape.points.length > 0) {
      drawShape(ctx, currentShape, selectedColor, null, true, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageLoaded, roiShapes, selectedROIIndex, selectedColor]);



  // Handle use case changes - recalculate canvas size if needed
  useEffect(() => {
    if (open) {
      const useCaseChanged = prevUseCaseRef.current !== useCaseName;
      prevUseCaseRef.current = useCaseName;
      
      if (useCaseChanged) {
        setTimeout(() => {
          recalcCanvasSize();
          // Redraw with existing image if already loaded
          if (imageLoaded) {
            drawCanvas();
          }
        }, 50);
      }
    }
  }, [open, useCaseName, recalcCanvasSize, imageLoaded, drawCanvas]);

  // ✅ FIX: Image loading useEffect - only reload when modal opens, not on use case change
  useEffect(() => {
    if (!open) {
      // Reset when modal closes
      setImageLoaded(false);
      return;
    }

    // If image is already loaded and use case changes, don't reload
    if (imageLoaded && imageRef.current) {
      console.log('✅ Image already loaded, reusing for:', useCaseName);
      // Just redraw with existing image
      setTimeout(() => drawCanvas(), 50);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('🔄 Starting image load for:', useCaseName);
    setImageLoaded(false);
    
    const img = new Image();
    imageRef.current = img;
    img.crossOrigin = 'anonymous';
    
    // img.onload = () => {
    //   console.log('✅ Image loaded successfully');
    //   recalcCanvasSize();
      
    //   // Wait for canvas size to be set, then mark as loaded
    //   setTimeout(() => {
    //     setImageLoaded(true);
    //   }, 50);
    // };

    img.onload = () => {
      recalcCanvasSize();

      requestAnimationFrame(() => {
        setImageLoaded(true);

        // 🔥 FORCE DRAW IMAGE IMMEDIATELY
        requestAnimationFrame(() => {
          drawCanvas();
        });
      });
    };

    img.onerror = (error) => {
      console.error('❌ Failed to load image:', cameraFeedUrl, error);
      setImageLoaded(false);
      
      // Draw error state
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#2c2c2c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Failed to load image', canvas.width / 2, canvas.height / 2);
        ctx.fillText('Path: ' + cameraFeedUrl, canvas.width / 2, canvas.height / 2 + 25);
      }
    };

    // Construct image URL
    let imageUrl = cameraFeedUrl;
    if (!imageUrl || imageUrl.trim() === '') {
      imageUrl = '/img/siteimage.jpg';
    } else if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
      imageUrl = '/' + imageUrl;
    }

    // Add cache buster only on first load
    const timestamp = Date.now();
    const separator = imageUrl.includes('?') ? '&' : '?';
    const cacheBuster = `${separator}_t=${timestamp}`;
    
    console.log('📸 Loading image from:', imageUrl + cacheBuster);
    img.src = imageUrl + cacheBuster;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [open, cameraFeedUrl, recalcCanvasSize, imageLoaded, useCaseName, drawCanvas]);


  // ✅ FIX: Redraw canvas when image loads or shapes change (excluding currentShape to avoid flicker)
  useEffect(() => {
    if (open && imageLoaded) {
      drawCanvas();
    }
  }, [open, imageLoaded, roiShapes, selectedROIIndex, selectedColor, drawCanvas]);

  // Handle window and container resize
  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
  if (isDrawingRef.current) return;
  recalcCanvasSize();
  setTimeout(drawCanvas, 50);
};


    window.addEventListener('resize', handleResize);
    
    const container = containerRef.current;
    const resizeObserver = new ResizeObserver(handleResize);
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [open, recalcCanvasSize, drawCanvas]);



  // Fix for addToHistory function
  const addToHistory = useCallback((newShapes: ROIShape[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newShapes]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

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

  

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const point = getCanvasCoordinates(e);

    if (drawingTool === 'rectangle') {
      const newShape = {
        type: 'rectangle' as DrawingTool,
        points: [point],
        completed: false,
        color: getNextColor(),
        name: selectedLabel,
        mode: roiMode,
      };
      currentShapeRef.current = newShape;
      setCurrentShape(newShape);
      setIsDrawing(true);
    } else if (drawingTool === 'freehand') {
      const newShape = {
        type: 'freehand' as DrawingTool,
        points: [point],
        completed: false,
        color: getNextColor(),
        name: selectedLabel,
        mode: roiMode,
      };
      currentShapeRef.current = newShape;
      setCurrentShape(newShape);
      setIsDrawing(true);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // isDrawingRef.current = true;
    if (!isDrawing || !currentShapeRef.current) return;
    const point = getCanvasCoordinates(e);

    if (drawingTool === 'rectangle') {
      const updatedShape = {
        ...currentShapeRef.current,
        points: [currentShapeRef.current.points[0], point],
      };
      currentShapeRef.current = updatedShape;
      
      // Draw immediately without state update to avoid flicker
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx && imageRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        
        roiShapes.forEach((shape, index) => {
          const isSelected = index === selectedROIIndex;
          drawShape(ctx, shape, shape.color, index + 1, false, isSelected);
        });
        
        drawShape(ctx, updatedShape, selectedColor, null, true, false);
      }
    } else if (drawingTool === 'freehand') {
      const lastPoint = currentShapeRef.current.points[currentShapeRef.current.points.length - 1];
      const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      if (distance >= 3) {
        const updatedShape = {
          ...currentShapeRef.current,
          points: [...currentShapeRef.current.points, point],
        };
        currentShapeRef.current = updatedShape;
        
        // Draw immediately without state update to avoid flicker
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx && imageRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
          
          roiShapes.forEach((shape, index) => {
            const isSelected = index === selectedROIIndex;
            drawShape(ctx, shape, shape.color, index + 1, false, isSelected);
          });
          
          drawShape(ctx, updatedShape, selectedColor, null, true, false);
        }
      }
    }
  };

  const handleCanvasMouseUp = () => {
    isDrawingRef.current = false;

    if (!currentShapeRef.current) return;

    if (drawingTool === 'rectangle' || drawingTool === 'freehand') {
      if (currentShapeRef.current.points.length >= 2) {
        const completedShape = { ...currentShapeRef.current, completed: true };
        const newShapes: ROIShape[] = [...roiShapes, completedShape];
        setRoiShapes(newShapes);
        addToHistory(newShapes);
      }
      currentShapeRef.current = null;
      setCurrentShape(null);
      setIsDrawing(false);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) return;

    const point = getCanvasCoordinates(e);

    if (drawingTool !== 'polygon' && !currentShapeRef.current) {
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

    if (!currentShapeRef.current) {
      const newShape = {
        type: 'polygon' as DrawingTool,
        points: [point],
        completed: false,
        color: getNextColor(),
        name: selectedLabel,
        mode: roiMode,
      };
      currentShapeRef.current = newShape;
      setCurrentShape(newShape);
    } else {
      const firstPoint = currentShapeRef.current.points[0];
      const distance = Math.hypot(point.x - firstPoint.x, point.y - firstPoint.y);

      const canvas = canvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      const scaleX = canvas ? canvas.width / (rect!.width || 1) : 1;
      const closeThreshold = 15 * scaleX;

      if (distance < closeThreshold && currentShapeRef.current.points.length >= 3) {
        const completedShape = { ...currentShapeRef.current, completed: true };
        const newShapes: ROIShape[] = [...roiShapes, completedShape];
        setRoiShapes(newShapes);
        addToHistory(newShapes);
        currentShapeRef.current = null;
        setCurrentShape(null);
      } else {
        const updatedShape = {
          ...currentShapeRef.current,
          points: [...currentShapeRef.current.points, point],
        };
        currentShapeRef.current = updatedShape;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && imageRef.current) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

          // Draw existing ROI shapes
          roiShapes.forEach((shape, index) => {
            drawShape(ctx, shape, shape.color, index + 1, false, index === selectedROIIndex);
          });

          // Draw PREVIEW polygon (the new updated shape)
          drawShape(ctx, updatedShape, selectedColor, null, true, false);
        }

        setCurrentShape(updatedShape);
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
    const newShapes: ROIShape[] = roiShapes.filter((_, i) => i !== index);
    setRoiShapes(newShapes);
    addToHistory(newShapes);
    if (selectedROIIndex === index) {
      setSelectedROIIndex(null);
    }
  };

  const handleROINameChange = (index: number, newName: string) => {
    const newShapes: ROIShape[] = roiShapes.map((shape, i) =>
      i === index ? { ...shape, name: newName } : shape
    );
    setRoiShapes(newShapes);
  };

  const handleROIColorChange = (index: number, newColor: string) => {
    const newShapes: ROIShape[] = roiShapes.map((shape, i) =>
      i === index ? { ...shape, color: newColor } : shape
    );
    setRoiShapes(newShapes);
    addToHistory(newShapes);
  };

  const handleROIModeToggle = (index: number) => {
    const newShapes: ROIShape[] = roiShapes.map((shape, i) =>
      i === index ? { ...shape, mode: shape.mode === 'include' ? 'exclude' : 'include' } : shape
    );
    setRoiShapes(newShapes);
    addToHistory(newShapes);
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
      fullWidth
      maxWidth="xl"
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: '95%',
            md: '95%',
            lg: '90%',
            xl: '1200px',
          },
          maxWidth: '1300px',
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
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 1, sm: 2 } }}>
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
                  fontSize: { xs: '0.72rem', sm: '0.8rem' },
                  py: '8px',
                },
                '& .MuiOutlinedInput-root': {
                  height: '35px',
                }
              }}
            >
              {(labels.length > 0 ? labels : ['ROI']).map((labelOption) => (

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
              height: { xs: '50vh', sm: '60vh', md: '70vh' },
              maxHeight: { xs: '50vh', sm: '60vh', md: '70vh' },
            }}
          >
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              style={{
                cursor: 'crosshair',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onClick={handleCanvasClick}
              onContextMenu={handleCanvasContextMenu}
            />

            {!imageLoaded && (
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'grey.500',
              }}>
                <CircularProgress size={24} sx={{ mb: 1 }} />
                <Typography variant="body2">Loading camera feed...</Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ mt: { xs: 1, sm: 2 }, color: 'grey.700', fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
            <Typography variant="caption">
              <strong>Rectangle:</strong> Click & drag | <strong>Polygon:</strong> Click points, click near start to close |{' '}
              <strong>Freehand:</strong> Click & drag | <strong>Right-click ROI:</strong> Edit menu
            </Typography>
          </Box>
        </Box>

        {/* Right sidebar for desktop */}
        {isMdUp && (
          <Box
            sx={{
              width: '240px',
              flex: '0 0 240px',
              display: 'flex',
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
                            {(labels.length > 0 ? labels : ['ROI']).map((labelOption) => (

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
                // onSave(roiShapes);
                const canvas = canvasRef.current!;
                const normalizedShapes = normalizeROI(roiShapes, canvas);
                onSave(normalizedShapes);
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
      )}

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: { xs: '45vw', sm: '200px' },
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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'white', p: 0.5 }}>
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

          <Box sx={{ p: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, fontSize: '0.7rem' }}>
              <PaletteIcon fontSize="small" />
              Color
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 20px)',
              gap: '8px',
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
                          sx: { fontWeight: 500, fontSize: '0.65rem' },
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          sx: {
                            fontSize: '0.55rem',
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
                        <DeleteIcon sx={{ fontSize: 10 }} />
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
                // onSave(roiShapes);
                const canvas = canvasRef.current!;
                const normalizedShapes = normalizeROI(roiShapes, canvas);
                onSave(normalizedShapes);
                onClose();
              }}
              disabled={roiShapes.length === 0}
              sx={{
                mb: 0.5,
                fontSize: '0.7rem',
                py: 0.375,
                minHeight: '32px'
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
              setContextMenu(null);
            }
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
        {(labels.length > 0 ? labels : ['ROI']).map((opt) => (

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