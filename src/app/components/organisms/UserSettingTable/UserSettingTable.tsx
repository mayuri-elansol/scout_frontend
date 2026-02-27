"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import styles from "./UserSettingTable.module.css";
import { BackendUser } from "@/app/(protectedRoutes)/(settings)/(userManagement)/viewUser/[targetUserId]/viewUser.types";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleName: string;
}

interface UserHistoryTableProps {
  users: User[];
  backendUsers: BackendUser[];
  currentUserId?: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onView: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const UserSettingTable: React.FC<UserHistoryTableProps> = ({
  users,
  backendUsers,
  currentUserId,
  canView,
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const totalRows = users.length;

  // Dynamic rows per page options
  const rowsPerPageOptions =
    totalRows > 20 ? [10, 20, { label: "All", value: totalRows }] : [totalRows];

  if (users.length === 0) return null;

  return (
    <Box mt={5} className={styles.section}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafc" }}>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => {
                const actualIndex = page * rowsPerPage + index;
                const backendUser = backendUsers[actualIndex];
                const isSelf = backendUser?.userId === currentUserId;

                return (
                  <TableRow key={backendUser?.userId ?? actualIndex}>
                    <TableCell>{actualIndex + 1}.</TableCell>

                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>

                    <TableCell>
                      {user.roleName?.toLowerCase().replaceAll(/[-_]/g, " ")}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => onView(actualIndex)}
                        disabled={!canView}
                      >
                        <Visibility />
                      </IconButton>

                      <IconButton
                        color="secondary"
                        onClick={() => onEdit(actualIndex)}
                        disabled={!canEdit || isSelf}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => onDelete(actualIndex)}
                        disabled={!canDelete || isSelf}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* Pagination */}
        {totalRows > rowsPerPage && (
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default UserSettingTable;
