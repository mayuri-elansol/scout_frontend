
// 'use client';

// import React, {  useMemo, useState } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TextField,
//   TablePagination,
//   Button,
  
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/store/store';
// import { useRoleOverviewQuery } from './RoleOverviewApi';
// import { FEATURE } from '@/app/config/featureRegistry';
// import { formatDate } from '@/utils/dateUtils';
// import Loader from '@/app/components/atoms/Loader/Loader';
// import AddRole from '../AddRole/AddRole';

// /* ---------------- TYPES ---------------- */

// interface RoleIdData {
//   role_id: string;
//   name: string;
//   can_delete: boolean;
//   roleFeatures: any[];
// }

// interface RowData {
//   createdAt: string;
//   updatedAt: string;
//   org_app_role_id: string;
//   role_id: RoleIdData;
// }

// /* ---------------- COMPONENT ---------------- */

// export default function RoleOverview() {
//   const router = useRouter();

//   /* ---------- AUTH ---------- */
//   const { user, features } = useSelector((state: RootState) => state.auth);
//   const tenantId = user?.org_id;
//   const userId = user?.userId;

//   /* ---------- PERMISSIONS ---------- */
//   const canAddRole = features.includes(FEATURE.ROLE_MANAGEMENT);
//   const canViewRole = features.includes(FEATURE.VIEW_ROLE);
//   const canEditRole = features.includes(FEATURE.EDIT_ROLE);
//   const canDeleteRole = features.includes(FEATURE.DELETE_ROLE);

//   /* ---------- API ---------- */

// const {
//   data,
//   isLoading,
//   isFetching,
// } = useRoleOverviewQuery(
//   { tenantId: tenantId!, userId: userId! },
//   {
//     skip: !tenantId || !userId,
//   }
// );
// const rows: RowData[] = data?.data?.data ?? [];

//   /* ---------- STATE ---------- */
//   const [orderBy, setOrderBy] =
//     useState<'name' | 'role_id' | 'createdAt' | 'updatedAt'>('name');
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);


//   /* ---------- SORT ---------- */
//   const sortedRows = useMemo(() => {
//     return [...rows].sort((a, b) => {
//       let aVal = '';
//       let bVal = '';

//       switch (orderBy) {
//         case 'name':
//           aVal = a.role_id?.name ?? '';
//           bVal = b.role_id?.name ?? '';
//           break;
//         case 'role_id':
//           aVal = a.role_id?.role_id ?? '';
//           bVal = b.role_id?.role_id ?? '';
//           break;
//         case 'createdAt':
//           aVal = a.createdAt;
//           bVal = b.createdAt;
//           break;
//         case 'updatedAt':
//           aVal = a.updatedAt;
//           bVal = b.updatedAt;
//           break;
//       }

//       return order === 'asc'
//         ? aVal.localeCompare(bVal)
//         : bVal.localeCompare(aVal);
//     });
//   }, [rows, order, orderBy]);

//   /* ---------- SEARCH ---------- */
//   const filteredRows = useMemo(() => {
//     const q = searchQuery.toLowerCase();
//     return sortedRows.filter(
//       (r) =>
//         r.role_id?.name?.toLowerCase().includes(q) ||
//         r.role_id?.role_id?.toLowerCase().includes(q)
//     );
//   }, [sortedRows, searchQuery]);

//   /* ---------- PAGINATION ---------- */
//   const paginatedRows = filteredRows.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   /* ---------- HANDLERS ---------- */
//   const handleView = (orgAppRoleId: string, roleId: string) =>
//     router.push(`/ViewRole/${orgAppRoleId}/${roleId}`);

//   const handleEdit = (orgAppRoleId: string, roleId: string) =>
//     router.push(`/EditRole/${orgAppRoleId}/${roleId}`);


//   /* ---------- LOADING ---------- */
//   if (isLoading ) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
//         <Loader />
//       </Box>
//     );
//   }

//   /* ---------- EMPTY STATE ---------- */
//   if (!isLoading && rows.length === 0) {
//     return <AddRole />;
//   }

//   /* ---------- UI ---------- */
//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" mb={2}>
//          <TextField
//           label="Search"
//           size="small"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         {canAddRole && (
//           <Button variant="contained" onClick={() => router.push('/CreateRole')}>
//             Add Role
//           </Button>
//         )}

       
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: 'rgba(169,177,184,0.2)' }}>
//               {['ROLE NAME', 'ROLE ID', 'CREATED AT', 'UPDATED AT'].map((h) => (
//                 <TableCell key={h}>{h}</TableCell>
//               ))}
//               <TableCell>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginatedRows.map((row) => (
//               <TableRow key={row.org_app_role_id}>
//                 <TableCell>{row.role_id.name}</TableCell>
//                 <TableCell>{row.role_id.role_id}</TableCell>
//                 <TableCell>{formatDate(row.createdAt)}</TableCell>
//                 <TableCell>{formatDate(row.updatedAt)}</TableCell>
//                 <TableCell>
//                   {canViewRole && (
//                     <IconButton
//                       color="primary"
//                       onClick={() =>
//                         handleView(row.org_app_role_id, row.role_id.role_id)
//                       }
//                     >
//                       <VisibilityIcon />
//                     </IconButton>
//                   )}

//                   {canEditRole && (
//                     <IconButton
//                       color="secondary"
//                       onClick={() =>
//                         handleEdit(row.org_app_role_id, row.role_id.role_id)
//                       }
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   )}

//                   {canDeleteRole && row.role_id.can_delete && (
//                     <IconButton color="error">
//                       <DeleteIcon />
//                     </IconButton>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 20]}
//           component="div"
//           count={filteredRows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(_, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(Number(e.target.value));
//             setPage(0);
//           }}
//         />
//       </TableContainer>
//     </Box>
//   );
// }
'use client';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useRoleListQuery, useDeleteRoleByIdMutation } from './RoleOverviewApi';
import { FEATURE } from '@/app/config/featureRegistry';
import { formatDate } from '@/utils/dateUtils';
import Loader from '@/app/components/atoms/Loader/Loader';
import { showToast } from '@/app/store/slices/toasterSlice';
import AddRole from '../AddRole/AddRole';

export default function RoleOverview() {
  const router = useRouter();
  const dispatch = useDispatch();

  /* ---------- AUTH ---------- */
  const { user, features } = useSelector((state: RootState) => state.auth);
  const tenantId = user?.org_id;
  const userId = user?.userId;

  /* ---------- PERMISSIONS ---------- */
  const canAddRole = features.includes(FEATURE.ROLE_MANAGEMENT);
  const canViewRole = features.includes(FEATURE.VIEW_ROLE);
  const canEditRole = features.includes(FEATURE.EDIT_ROLE);
  const canDeleteRole = features.includes(FEATURE.DELETE_ROLE);

  /* ---------- API ---------- */
  const { data, isLoading } = useRoleListQuery(
    { tenantId: tenantId!, userId: userId! },
    { skip: !tenantId || !userId }
  );
  const rows = data?.data?.data ?? [];

  const [deleteRoleById, { isLoading: isDeleting }] = useDeleteRoleByIdMutation();

  /* ---------- STATE ---------- */
  const [orderBy, setOrderBy] =
    useState<'name' | 'role_id' | 'createdAt' | 'updatedAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  /* ---------- SORT ---------- */
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      let aVal = '';
      let bVal = '';

      switch (orderBy) {
        case 'name':
          aVal = a.role_id?.name ?? '';
          bVal = b.role_id?.name ?? '';
          break;
        case 'role_id':
          aVal = a.role_id?.role_id ?? '';
          bVal = b.role_id?.role_id ?? '';
          break;
        case 'createdAt':
          aVal = a.createdAt;
          bVal = b.createdAt;
          break;
        case 'updatedAt':
          aVal = a.updatedAt;
          bVal = b.updatedAt;
          break;
      }

      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [rows, order, orderBy]);

  /* ---------- SEARCH ---------- */
  const filteredRows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return sortedRows.filter(
      (r) =>
        r.role_id?.name?.toLowerCase().includes(q) ||
        r.role_id?.role_id?.toLowerCase().includes(q)
    );
  }, [sortedRows, searchQuery]);

  /* ---------- PAGINATION ---------- */
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* ---------- HANDLERS ---------- */
  const handleView = (orgAppRoleId: string, roleId: string) =>
    router.push(`/ViewRole/${orgAppRoleId}/${roleId}`);

  const handleEdit = (orgAppRoleId: string, roleId: string) =>
    router.push(`/EditRole/${orgAppRoleId}/${roleId}`);

  const handleOpenConfirm = (roleId: string) => {
    setSelectedRoleId(roleId);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedRoleId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!tenantId || !userId || !selectedRoleId) return;

    try {
      const res = await deleteRoleById({ tenantId, userId, roleId: selectedRoleId }).unwrap();

      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: res.message || 'Role deleted successfully',
          severity: 'success',
        })
      );

      handleCloseConfirm();
    } catch (err: any) {
      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: err?.data?.message || 'Failed to delete role',
          severity: 'error',
        })
      );
    }
  };

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Loader />
      </Box>
    );
  }

  /* ---------- EMPTY STATE ---------- */
  if (!isLoading && rows.length === 0) {
    return <AddRole />;
  }

  /* ---------- UI ---------- */
  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {canAddRole && (
          <Button variant="contained" onClick={() => router.push('/CreateRole')}>
            Add Role
          </Button>
        )}
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'rgba(169,177,184,0.2)' }}>
              {['ROLE NAME', 'ROLE ID', 'CREATED AT', 'UPDATED AT'].map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.org_app_role_id}>
                <TableCell>{row.role_id.name}</TableCell>
                <TableCell>{row.role_id.role_id}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{formatDate(row.updatedAt)}</TableCell>
                <TableCell>
                  {canViewRole && (
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleView(row.org_app_role_id, row.role_id.role_id)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}

                  {canEditRole && (
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        handleEdit(row.org_app_role_id, row.role_id.role_id)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  )}

                  {canDeleteRole && row.role_id.can_delete && (
                    <IconButton
                      color="error"
                      onClick={() => handleOpenConfirm(row.role_id.role_id)}
                      disabled={isDeleting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* ---------- CONFIRM DIALOG ---------- */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Delete </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this role? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={isDeleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
