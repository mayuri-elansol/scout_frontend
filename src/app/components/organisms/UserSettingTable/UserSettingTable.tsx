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
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import styles from "./UserSettingTable.module.css";
import { BackendUser } from "@/app/(protectedRoutes)/(Settings)/(UserManagement)/ViewUser/[targetUserId]/viewUser.types";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleName: string;
}

interface UserHistoryTableProps {
  users: User[];
  backendUsers: BackendUser[]; // ✅ ADD
  currentUserId?: string; // ✅ ADD
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
  if (users.length === 0) return null;
  return (


    <Box mt={5} className={styles.section}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafc" }}>
            <TableRow>
              {/* ✅ Sr No column */}
              <TableCell>Sr No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {users.map((user, index) => {
              const backendUser = backendUsers[index];
              const isSelf = backendUser.userId === currentUserId;
              return (
                <TableRow key={backendUser?.userId ?? index}>
                  <TableCell>{index + 1}.</TableCell>

                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>  {user.roleName?.toLowerCase().replaceAll(/[-_]/g, " ")}
                  </TableCell>

                  <TableCell align="center">
                    {/* VIEW */}

                    <IconButton
                      color="primary"
                      onClick={() => onView(index)}
                      disabled={!canView}
                    >
                      <Visibility />
                    </IconButton>
                    {/* EDIT */}

                    <IconButton
                      color="secondary"
                      onClick={() => onEdit(index)}
                      disabled={!canEdit || isSelf}
                    >
                      <Edit />
                    </IconButton>
                    {/* DELETE */}

                    <IconButton
                      color="error"
                      onClick={() => onDelete(index)}
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
      </TableContainer>
    </Box>

  );
};

export default UserSettingTable;
