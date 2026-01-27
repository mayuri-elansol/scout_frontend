'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '@/utils/dateUtils';
import { RoleSettingTableProps } from './RoleSettingTable.types';
 

const RoleSettingTable: React.FC<RoleSettingTableProps> = ({
  rows,
  roleName,
  canView,
  canEdit,
  canDelete,
  isDeleting,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: 'rgba(169,177,184,0.2)' }}>
            <TableCell>ROLE NAME</TableCell>
            <TableCell>ROLE ID</TableCell>
            <TableCell>CREATED AT</TableCell>
            <TableCell>UPDATED AT</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => {
            const isSelfRole =
              row.role_id?.name?.toLowerCase() === roleName?.toLowerCase();

            return (
              <TableRow key={row.org_app_role_id}>
                <TableCell>{row.role_id.name}</TableCell>
                <TableCell>{row.role_id.role_id}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{formatDate(row.updatedAt)}</TableCell>

                <TableCell>
                  {canView && (
                    <IconButton
                      color="primary"
                      onClick={() =>
                        onView(row.org_app_role_id, row.role_id.role_id)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}

                  {canEdit && (
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        onEdit(row.org_app_role_id, row.role_id.role_id)
                      }
                      disabled={isSelfRole}
                    >
                      <EditIcon />
                    </IconButton>
                  )}

                  {canDelete &&  (
                    <IconButton
                      color="error"
                      onClick={() => onDelete(row.role_id.role_id)}
                      disabled={isSelfRole || isDeleting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleSettingTable;
