# RTK Query Migration Guide - Scout Frontend

## ✅ What's Done

1. **API Files Created**:
   - `UseCaseManagerAPI.tsx` - RTK Query API for Use Case Manager
   - `ZoneLocationMappingApi.tsx` - RTK Query API for Zone Location Mapping

2. **Store Configuration**: Already set up with `baseProtectedApi`
   - Tag types already added: `'UseCaseManager'` and `'ZoneLocationManagement'`
   - No additional store configuration needed!

## 📋 Migration Steps

### Step 1: Update UseCaseManager Component

**File**: `D:\BackOffice\scout_frontend\src\app\(protectedRoutes)\(Settings)\(Configurator)\UseCaseManager\UseCaseManager.tsx`

#### 1.1 Update Imports
```typescript
// REMOVE this import
import { getUsecases, getCameras, assignCameras, getAssignments }
  from "@/app/services/configurator/usecaseService";

// ADD these imports
import {
  useGetUsecasesQuery,
  useGetCamerasQuery,
  useAssignCamerasMutation,
  useGetAssignmentsQuery,
} from "./UseCaseManagerAPI";
```

#### 1.2 Replace State Management

**REMOVE these lines**:
```typescript
const [useCases, setUseCases] = useState<UseCase[]>([]);
const [cameras, setCameras] = useState<Camera[]>([]);
const [isLoadingUseCases, setIsLoadingUseCases] = useState(true);
const [isLoadingCameras, setIsLoadingCameras] = useState(false);
```

**ADD these hooks**:
```typescript
// Fetch use cases
const { 
  data: useCasesResponse, 
  isLoading: isLoadingUseCases,
  refetch: refetchUseCases 
} = useGetUsecasesQuery();

// Fetch cameras (skip initially, load when needed)
const { 
  data: camerasResponse, 
  isLoading: isLoadingCameras 
} = useGetCamerasQuery(undefined, {
  skip: true, // Initially skip, trigger manually
});

// Mutation for assigning cameras
const [assignCameras, { isLoading: isAssigning }] = useAssignCamerasMutation();
```

#### 1.3 Update loadUseCases function

**REMOVE this**:
```typescript
const loadUseCases = async () => {
  setIsLoadingUseCases(true);
  try {
    const res = await getUsecases();
    const usecases = res.data.map((uc: Record<string, unknown>) => ({
      id: uc.id,
      name: uc.usecaseName,
      description: uc.description,
      category: "AI",
      enabled: true,
      assignedCameraIds: [],
    }));
    
    for (const uc of usecases) {
      const assignments = await getAssignments(uc.id);
      uc.assignedCameraIds = assignments.data.map((m: Record<string, unknown>) => String(m.cameraId));
    }

    setUseCases(usecases);
  } catch (err) {
    console.error("Error loading use cases:", err);
    setError("Failed to load use cases. Please try again later.");
  } finally {
    setIsLoadingUseCases(false);
  }
};
```

**ADD this** (process data from RTK Query):
```typescript
// Process use cases data
const useCases = useMemo(() => {
  if (!useCasesResponse?.data) return [];
  
  return useCasesResponse.data.map((uc) => ({
    id: uc.id,
    name: uc.usecaseName,
    description: uc.description,
    category: "AI",
    enabled: true,
    assignedCameraIds: [], // Will be loaded separately
  }));
}, [useCasesResponse]);

// Optional: Load assignments for each use case
useEffect(() => {
  if (useCases.length > 0) {
    // Load assignments if needed
    // You can create separate queries for each use case
  }
}, [useCases]);
```

#### 1.4 Update loadCameras function

**REMOVE this**:
```typescript
const loadCameras = async () => {
  setIsLoadingCameras(true);
  try {
    const res = await getCameras();
    setCameras(
      res.data.map((cam: Record<string, unknown>) => ({
        id: cam.id,
        name: cam.cameraName,
        position: cam.cameraZone,
        location: cam.cameraZone,
        ipAddress: cam.cameraIp,
        port: cam.RTSPport,
        make: cam.connectionType,
        status: "connected",
      }))
    );
  } catch (err) {
    console.error("Error loading cameras:", err);
  } finally {
    setIsLoadingCameras(false);
  }
};
```

**ADD this**:
```typescript
// Use lazy query to load cameras on demand
const [triggerGetCameras, { data: camerasResponse }] = useLazyGetCamerasQuery();

// Process cameras data
const cameras = useMemo(() => {
  if (!camerasResponse?.data) return [];
  
  return camerasResponse.data.map((cam) => ({
    id: cam.id,
    name: cam.cameraName,
    position: cam.cameraZone,
    location: cam.cameraZone,
    ipAddress: cam.cameraIp,
    port: cam.RTSPport,
    make: cam.connectionType,
    status: "connected",
  }));
}, [camerasResponse]);

// Load cameras when needed
const handleConfigureCameras = async (useCase: UseCase) => {
  setSelectedUseCase(useCase);
  setDrawerOpen(true);

  if (cameras.length === 0) {
    triggerGetCameras(); // Trigger the lazy query
  }
};
```

#### 1.5 Update handleSaveCameraAssignments

**REPLACE this**:
```typescript
const handleSaveCameraAssignments = async (useCaseId: string, selectedCameraIds: string[]) => {
  try {
    await assignCameras(useCaseId, selectedCameraIds);

    setUseCases((prev) =>
      prev.map((uc) =>
        uc.id === useCaseId ? { ...uc, assignedCameraIds: selectedCameraIds } : uc
      )
    );
    console.log("Saved camera assignments:", {
      useCaseId,
      selectedCameraIds,
    });
  } catch (err) {
    console.error("Error saving Camera Assignment", err);
  }
};
```

**WITH this**:
```typescript
const handleSaveCameraAssignments = async (useCaseId: string, selectedCameraIds: string[]) => {
  try {
    await assignCameras({ 
      usecaseId: useCaseId, 
      cameraIds: selectedCameraIds 
    }).unwrap();
    
    // No need to manually update state - RTK Query handles cache invalidation
    console.log("Saved camera assignments:", {
      useCaseId,
      selectedCameraIds,
    });
  } catch (err) {
    console.error("Error saving Camera Assignment", err);
    setError("Failed to save camera assignments");
  }
};
```

#### 1.6 Remove useEffect

**REMOVE this**:
```typescript
useEffect(() => {
  loadUseCases();
}, []);
```

No replacement needed! RTK Query automatically fetches on component mount.

---

### Step 2: Update ZoneLocationMapping Component

**File**: `D:\BackOffice\scout_frontend\src\app\(protectedRoutes)\(Settings)\(Configurator)\ZoneLocationMapping\ZoneLocationMapping.tsx`

#### 2.1 Update Imports

```typescript
// REMOVE this import
import { getZones, createZone, updateZone, deleteZone, createLocation } 
  from "@/app/services/configurator/zoneLocationService";

// ADD these imports
import {
  useGetZonesQuery,
  useCreateZoneMutation,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
  useCreateLocationMutation,
} from "./ZoneLocationMappingApi";
```

#### 2.2 Replace State Management

**REMOVE**:
```typescript
const [zones, setZones] = useState<ZoneType[]>([]);
```

**ADD**:
```typescript
// Fetch zones
const { data: zonesResponse, isLoading, refetch } = useGetZonesQuery();

// Mutations
const [createZone, { isLoading: isCreating }] = useCreateZoneMutation();
const [updateZone, { isLoading: isUpdating }] = useUpdateZoneMutation();
const [deleteZone, { isLoading: isDeleting }] = useDeleteZoneMutation();
const [createLocation, { isLoading: isCreatingLocation }] = useCreateLocationMutation();

// Process zones data
const zones = useMemo(() => {
  if (!zonesResponse?.data?.zones) return [];
  
  return zonesResponse.data.zones.map((z) => ({
    id: String(z.id),
    name: z.zoneName,
    description: z.description,
    locations: z.locations ?? [],
    cameraIds: z.cameras ?? [],
  }));
}, [zonesResponse]);
```

#### 2.3 Update handleSaveZone

**REPLACE**:
```typescript
const handleSaveZone = async (zoneData: ZoneFormData) => {
  if (zoneData.id) {
    await updateZone(zoneData.id, {
      zoneName: zoneData.name,
      description: zoneData.description ?? ""
    });
  } else {
    await createZone({
      zoneName: zoneData.name,
      description: zoneData.description ?? ""
    });
  }

  fetchZones();
};
```

**WITH**:
```typescript
const handleSaveZone = async (zoneData: ZoneFormData) => {
  try {
    if (zoneData.id) {
      await updateZone({
        id: zoneData.id,
        data: {
          zoneName: zoneData.name,
          description: zoneData.description ?? "",
        },
      }).unwrap();
    } else {
      await createZone({
        zoneName: zoneData.name,
        description: zoneData.description ?? "",
      }).unwrap();
    }
    // No need to call fetchZones() - RTK Query auto-refetches
  } catch (err) {
    console.error("Failed to save zone", err);
  }
};
```

#### 2.4 Update confirmDelete

**REPLACE**:
```typescript
const confirmDelete = async () => {
  if (!zoneToDelete?.id) return;

  await deleteZone(zoneToDelete.id);
  fetchZones();
  setZoneToDelete(null);
};
```

**WITH**:
```typescript
const confirmDelete = async () => {
  if (!zoneToDelete?.id) return;

  try {
    await deleteZone(zoneToDelete.id).unwrap();
    setZoneToDelete(null);
    // No need to call fetchZones() - RTK Query auto-refetches
  } catch (err) {
    console.error("Failed to delete zone", err);
  }
};
```

#### 2.5 Update handleSaveLocations

**REPLACE**:
```typescript
const handleSaveLocations = async (zoneId: string, locations: LocationItem[]) => {
  for (const loc of locations) {
    await createLocation({
      zoneId,
      locationName: loc.name,
      description: loc.description ?? ""
    });
  }
  fetchZones();
};
```

**WITH**:
```typescript
const handleSaveLocations = async (zoneId: string, locations: LocationItem[]) => {
  try {
    for (const loc of locations) {
      await createLocation({
        zoneId,
        locationName: loc.name,
        description: loc.description ?? "",
      }).unwrap();
    }
    // No need to call fetchZones() - RTK Query auto-refetches
  } catch (err) {
    console.error("Failed to create location", err);
  }
};
```

#### 2.6 Remove fetchZones and useEffect

**REMOVE**:
```typescript
const fetchZones = async () => {
  try {
    const { data } = await getZones();
    setZones(
      data.zones.map((z: Record<string, unknown>) => ({
        id: String(z.id), 
        name: z.zoneName,
        description: z.description,
        locations: z.locations ?? [],
        cameraIds: z.cameras ?? []
      }))
    );
  } catch (err) {
    console.error("Failed to fetch zones", err);
  }
};

useEffect(() => {
  fetchZones();
}, []);
```

No replacement needed! RTK Query handles this automatically.

---

## Step 3: Test Everything

### UseCaseManager Testing
- [ ] Page loads and displays use cases
- [ ] Click "Configure Cameras" opens drawer
- [ ] Cameras load in the drawer
- [ ] Assigning cameras works
- [ ] Data refreshes after assignment

### ZoneLocationMapping Testing
- [ ] Page loads and displays zones
- [ ] Create zone works
- [ ] Edit zone works
- [ ] Delete zone works
- [ ] Create location works
- [ ] Stats update correctly

---

## Step 4: Clean Up (Optional)

Once everything works, you can delete the old service files:

```
D:\BackOffice\scout_frontend\src\app\services\configurator\usecaseService.ts
D:\BackOffice\scout_frontend\src\app\services\configurator\zoneLocationService.ts
```

---

## 🎯 Benefits You'll Get

1. **Automatic Caching**: No duplicate requests
2. **Auto Refetching**: Data updates automatically after mutations
3. **Loading States**: Built-in `isLoading` flags
4. **Error Handling**: Consistent error objects
5. **Type Safety**: Full TypeScript support
6. **Less Code**: No manual state management needed

---

## 🐛 Troubleshooting

### Issue: "Cannot find module './UseCaseManagerAPI'"
**Solution**: Make sure the file name matches exactly (check capitalization)

### Issue: Data not refreshing after mutation
**Solution**: Check that tag types match in `baseProtectedApi.ts`:
- `'UseCaseManager'`
- `'ZoneLocationManagement'`

### Issue: TypeScript errors
**Solution**: Make sure to import types from the API file

---

## 📝 Quick Reference

### UseCaseManager Hooks
```typescript
useGetUsecasesQuery()          // Get all use cases
useGetCamerasQuery()            // Get all cameras
useGetAssignmentsQuery(id)      // Get assignments for use case
useAssignCamerasMutation()      // Assign cameras to use case
useUnassignCameraMutation()     // Unassign camera from use case
```

### ZoneLocationMapping Hooks
```typescript
useGetZonesQuery()              // Get all zones
useCreateZoneMutation()         // Create new zone
useUpdateZoneMutation()         // Update existing zone
useDeleteZoneMutation()         // Delete zone
useCreateLocationMutation()     // Create new location
```

---

## Need Help?

Compare your changes with the `CameraManagementApi.tsx` file to see the pattern you've already successfully implemented!
