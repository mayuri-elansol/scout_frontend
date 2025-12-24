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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/dateUtils';

// ---------------- TYPES ----------------

interface RoleIdData {
  createdAt: string;
  updatedAt: string;
  role_id: string;
  name: string;
  can_delete: boolean;
  roleFeatures: string[];
}

interface RowData {
  createdAt: string;
  updatedAt: string;
  org_app_role_id: string;
  role_id: RoleIdData;
}

interface RoleOverviewTableProps {
  roleTableData?: RowData[] || [];
}

// ---------------- COMPONENT ----------------

export default function RoleOverview({
  roleTableData,
}: Readonly<RoleOverviewTableProps>) {
  const router = useRouter();

  // permissions from redux (UI only)
//   const userFeatures = useSelector((state: RootState) => state.user.features);
//   const canDeleteRole = userFeatures?.includes(FEATURES.ROLE.DELETE);
//   const canViewRole = userFeatures?.includes(FEATURES.ROLE.VIEW);
//   const canEditRole = userFeatures?.includes(FEATURES.ROLE.EDIT);

  const [rows, setRows] = useState<RowData[]>([]);
  const [orderBy, setOrderBy] =
    useState<'name' | 'role_id' | 'createdAt' | 'updatedAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setRows(roleTableData);
  }, [roleTableData]);

  // ---------------- SORTING ----------------

  const sortedRows = useMemo(() => {
    const compare = (a: RowData, b: RowData) => {
      let aValue = '';
      let bValue = '';

      switch (orderBy) {
        case 'name':
          aValue = a.role_id?.name ?? '';
          bValue = b.role_id?.name ?? '';
          break;
        case 'role_id':
          aValue = a.role_id?.role_id ?? '';
          bValue = b.role_id?.role_id ?? '';
          break;
        case 'createdAt':
          aValue = a.createdAt ?? '';
          bValue = b.createdAt ?? '';
          break;
        case 'updatedAt':
          aValue = a.updatedAt ?? '';
          bValue = b.updatedAt ?? '';
          break;
      }

      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    };

    return [...rows].sort(compare);
  }, [rows, order, orderBy]);

  // ---------------- SEARCH ----------------

  const filteredRows = useMemo(() => {
    return sortedRows.filter((row) => {
      const name = row.role_id?.name?.toLowerCase() ?? '';
      const id = row.role_id?.role_id?.toLowerCase() ?? '';
      return name.includes(searchQuery.toLowerCase()) ||
        id.includes(searchQuery.toLowerCase());
    });
  }, [sortedRows, searchQuery]);

  // ---------------- PAGINATION ----------------

  const paginatedRows = useMemo(() => {
    return filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredRows, page, rowsPerPage]);

  // ---------------- HANDLERS (UI ONLY) ----------------

  const handleView = (orgAppRoleId: string, roleId: string) => {
    router.push(`/viewRole/${orgAppRoleId}/${roleId}`);
  };

  const handleEdit = (orgAppRoleId: string, roleId: string) => {
    router.push(`/editRole/editPermissionsForRole/${orgAppRoleId}/${roleId}`);
  };

  const handleDelete = (roleId: string) => {
    console.log('Delete clicked for role:', roleId);
    // 🔥 API call will be added later
  };

  // ---------------- RENDER ----------------

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          color="primary"
        //   label="Add Role"
          type="button"
          variant="contained"
          onClick={() => router.push('/addRole')}
        />

        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search role"
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'rgba(169,177,184,0.2)' }}>
              {[
                { label: 'NAME', prop: 'name' as const },
                { label: 'ROLE ID', prop: 'role_id' as const },
                { label: 'CREATED AT', prop: 'createdAt' as const },
                { label: 'UPDATED AT', prop: 'updatedAt' as const },
              ].map((col) => (
                <TableCell key={col.label}>
                  <TableSortLabel
                    active={orderBy === col.prop}
                    direction={orderBy === col.prop ? order : 'asc'}
                    onClick={() => {
                      setOrder(orderBy === col.prop && order === 'asc' ? 'desc' : 'asc');
                      setOrderBy(col.prop);
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.org_app_role_id}>
                <TableCell>{row.role_id?.name ?? '-'}</TableCell>
                <TableCell>{row.role_id?.role_id ?? '-'}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{formatDate(row.updatedAt)}</TableCell>
                <TableCell sx={{ display: 'flex' }}>
                  <IconButton
                    color="primary"
                    // disabled={!canViewRole}
                    onClick={() =>
                      handleView(row.org_app_role_id, row.role_id.role_id)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color="secondary"
                    // disabled={!canEditRole}
                    onClick={() =>
                      handleEdit(row.org_app_role_id, row.role_id.role_id)
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    // disabled={!canDeleteRole}
                    onClick={() => handleDelete(row.role_id.role_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </Box>
  );
}
