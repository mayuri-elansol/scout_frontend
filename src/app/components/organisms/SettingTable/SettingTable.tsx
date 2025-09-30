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
    Avatar,
    IconButton,
    Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styles from "./SettingTable.module.css";
import Appbar from "../AppBar/AppBar";

interface UserHistoryTableProps {
    users: any[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

const SettingTable: React.FC<UserHistoryTableProps> = ({
    users,
    onEdit,
    onDelete,
}) => {
    if (users.length === 0) return null;

    return (<>


        <Appbar title="User Overview" />
        <Box mt={5} className={styles.section}>
            <TableContainer component={Paper} className={styles.historyTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Profile</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Site</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Avatar src={user.profileImage || ""} sx={{
                                        '& img': {
                                            objectFit: 'contain',
                                        },
                                    }} />
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.site}</TableCell>
                                <TableCell>{user.department}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => onEdit(index)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => onDelete(index)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>

    );
};

export default SettingTable;
