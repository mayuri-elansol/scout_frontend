
// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
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
// import { formatDate } from '@/utils/dateUtils';
// import { FEATURE } from '@/app/config/featureRegistry';

// /* ---------------- TYPES ---------------- */

// interface RoleIdData {
//   createdAt: string;
//   updatedAt: string;
//   role_id: string;
//   name: string;
//   can_delete: boolean;
//   roleFeatures: string[];
// }

// interface RowData {
//   createdAt: string;
//   updatedAt: string;
//   org_app_role_id: string;
//   role_id: RoleIdData;
// }

// interface RoleOverviewTableProps {
//   roleTableData?: RowData[];
// }

// /* ---------------- COMPONENT ---------------- */

// export default function RoleOverview({
//   roleTableData = [],
// }: Readonly<RoleOverviewTableProps>) {
//   const router = useRouter();

//   /* ---------- FEATURES FROM AUTH SLICE ---------- */
//   const features = useSelector((state: RootState) => state.auth.features);

//   const canAddRole = features.includes(FEATURE.ROLE_MANAGEMENT);
//   const canViewRole = features.includes(FEATURE.VIEW_ROLE);
//   const canEditRole = features.includes(FEATURE.EDIT_ROLE);
//   const canDeleteRole = features.includes(FEATURE.DELETE_ROLE);

//   /* ---------- STATE ---------- */

//   const [rows, setRows] = useState<RowData[]>([]);
//   const [orderBy, setOrderBy] =
//     useState<'name' | 'role_id' | 'createdAt' | 'updatedAt'>('name');
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setRows(roleTableData);
//   }, [roleTableData]);

//   /* ---------- SORTING ---------- */

//   const sortedRows = useMemo(() => {
//     return [...rows].sort((a, b) => {
//       let aValue = '';
//       let bValue = '';

//       switch (orderBy) {
//         case 'name':
//           aValue = a.role_id?.name ?? '';
//           bValue = b.role_id?.name ?? '';
//           break;
//         case 'role_id':
//           aValue = a.role_id?.role_id ?? '';
//           bValue = b.role_id?.role_id ?? '';
//           break;
//         case 'createdAt':
//           aValue = a.createdAt ?? '';
//           bValue = b.createdAt ?? '';
//           break;
//         case 'updatedAt':
//           aValue = a.updatedAt ?? '';
//           bValue = b.updatedAt ?? '';
//           break;
//       }

//       return order === 'asc'
//         ? aValue.localeCompare(bValue)
//         : bValue.localeCompare(aValue);
//     });
//   }, [rows, order, orderBy]);

//   /* ---------- SEARCH ---------- */

//   const filteredRows = useMemo(() => {
//     const q = searchQuery.toLowerCase();
//     return sortedRows.filter((row) =>
//       row.role_id?.name?.toLowerCase().includes(q) ||
//       row.role_id?.role_id?.toLowerCase().includes(q)
//     );
//   }, [sortedRows, searchQuery]);

//   /* ---------- PAGINATION ---------- */

//   const paginatedRows = useMemo(() => {
//     return filteredRows.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
//   }, [filteredRows, page, rowsPerPage]);

//   /* ---------- HANDLERS ---------- */

//   const handleView = (orgAppRoleId: string, roleId: string) => {
//     router.push(`/viewRole/${orgAppRoleId}/${roleId}`);
//   };

//   const handleEdit = (orgAppRoleId: string, roleId: string) => {
//     router.push(`/editRole/editPermissionsForRole/${orgAppRoleId}/${roleId}`);
//   };

//   const handleDelete = (roleId: string) => {
//     console.log('Delete clicked:', roleId);
//   };

//   /* ---------- RENDER ---------- */

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         {canAddRole && (
//           <Button
//             variant="contained"
//             onClick={() => router.push('/CreateRole')}
//           >
//             Add Role
//           </Button>
//         )}

//         <TextField
//           label="Search"
//           size="small"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: 'rgba(169,177,184,0.2)' }}>
//               {[
//                 { label: 'NAME', prop: 'name' as const },
//                 { label: 'ROLE ID', prop: 'role_id' as const },
//                 { label: 'CREATED AT', prop: 'createdAt' as const },
//                 { label: 'UPDATED AT', prop: 'updatedAt' as const },
//               ].map((col) => (
//                 <TableCell key={col.label}>
//                   <TableSortLabel
//                     active={orderBy === col.prop}
//                     direction={orderBy === col.prop ? order : 'asc'}
//                     onClick={() => {
//                       setOrder(orderBy === col.prop && order === 'asc' ? 'desc' : 'asc');
//                       setOrderBy(col.prop);
//                     }}
//                   >
//                     {col.label}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//               <TableCell>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginatedRows.map((row) => (
//               <TableRow key={row.org_app_role_id}>
//                 <TableCell>{row.role_id?.name ?? '-'}</TableCell>
//                 <TableCell>{row.role_id?.role_id ?? '-'}</TableCell>
//                 <TableCell>{formatDate(row.createdAt)}</TableCell>
//                 <TableCell>{formatDate(row.updatedAt)}</TableCell>
//                 <TableCell sx={{ display: 'flex' }}>
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
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(row.role_id.role_id)}
//                     >
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

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
  TextField,
  TablePagination,
  Button,
  CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store';
import { useRoleOverviewMutation } from './RoleOverviewApi';
import { FEATURE } from '@/app/config/featureRegistry';
import { formatDate } from '@/utils/dateUtils';

/* ---------------- TYPES ---------------- */

interface RoleIdData {
  role_id: string;
  name: string;
  can_delete: boolean;
  roleFeatures: any[];
}

interface RowData {
  createdAt: string;
  updatedAt: string;
  org_app_role_id: string;
  role_id: RoleIdData;
}

/* ---------------- COMPONENT ---------------- */

export default function RoleOverview() {
  const router = useRouter();

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
  const [fetchRoles, { isLoading }] = useRoleOverviewMutation();

  /* ---------- STATE ---------- */
  const [rows, setRows] = useState<RowData[]>([]);
  const [orderBy, setOrderBy] =
    useState<'name' | 'role_id' | 'createdAt' | 'updatedAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    if (!tenantId || !userId) return;

    fetchRoles({ tenantId, userId })
      .unwrap()
      .then((res) => {
        const list = res?.data?.data;
        setRows(Array.isArray(list) ? list : []);
      })
      .catch(() => setRows([]));
  }, [tenantId, userId, fetchRoles]);

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
    router.push(`/viewRole/${orgAppRoleId}/${roleId}`);

  const handleEdit = (orgAppRoleId: string, roleId: string) =>
    router.push(`/editRole/editPermissionsForRole/${orgAppRoleId}/${roleId}`);

  /* ---------- LOADING ---------- */
  if (isLoading && rows.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  /* ---------- UI ---------- */
  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        {canAddRole && (
          <Button variant="contained" onClick={() => router.push('/CreateRole')}>
            Add Role
          </Button>
        )}

        <TextField
          label="Search"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'rgba(169,177,184,0.2)' }}>
              {['NAME', 'ROLE ID', 'CREATED AT', 'UPDATED AT'].map((h) => (
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
                    <IconButton color="error">
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
    </Box>
  );
}
