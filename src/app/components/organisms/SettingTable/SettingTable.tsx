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
import styles from "./SettingTable.module.css";
import { BackendUser } from "@/app/(protectedRoutes)/(Settings)/(UserManagement)/ViewUser/[targetUserId]/viewUser.types";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserHistoryTableProps {
  users: User[];
    backendUsers: BackendUser[];   // ✅ ADD
  currentUserId?: string;        // ✅ ADD

  onView: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const SettingTable: React.FC<UserHistoryTableProps> = ({
  users,
    backendUsers,
  currentUserId,
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
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
{/* 
            <TableBody>
              {users.map((user, index) => (
                
                <TableRow key={index +1}>
                  <TableCell>{index + 1} .</TableCell>

                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>

                  <TableCell align="center">
                    <IconButton color="info" onClick={() => onView(index)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" onClick={() => onEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}

<TableBody>
  {users.map((user, index) => {
    const isSelf = backendUsers[index]?.userId === currentUserId; // ✅ check if this row is self

    return (
      <TableRow key={index + 1}>
        <TableCell>{index + 1}.</TableCell>
        <TableCell>
          {user.firstName} {user.lastName}
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell align="center">
          <IconButton color="info" onClick={() => onView(index)}>
            <Visibility />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => onEdit(index)}
            disabled={isSelf} // ❌ Disable Edit if self
          >
            <Edit />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(index)}
            disabled={isSelf} // ❌ Disable Delete if self
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

export default SettingTable;
