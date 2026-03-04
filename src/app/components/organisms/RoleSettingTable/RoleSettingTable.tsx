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
  TablePagination,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/utils/dateUtils";
import { RoleSettingTableProps } from "./RoleSettingTable.types";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const filteredRows = rows.filter((row) => {
    const rowRole = row.role_id?.name?.toLowerCase();
    const currentUserRole = roleName?.toLowerCase();

    if (rowRole === "organisation_admin_scout") {
      return currentUserRole === "organisation_admin_scout";
    }
    return true;
  });

  const totalRows = filteredRows.length;

  const rowsPerPageOptions =
    totalRows > 20 ? [10, 20, { label: "All", value: totalRows }] : [totalRows];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "rgba(169,177,184,0.2)" }}>
              <TableCell>Sr No</TableCell>
              <TableCell>ROLE NAME</TableCell>
              <TableCell>ROLE ID</TableCell>
              <TableCell>CREATED AT</TableCell>
              <TableCell>UPDATED AT</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const actualIndex = page * rowsPerPage + index;

                const isSelfRole =
                  row.role_id?.name?.toLowerCase() === roleName?.toLowerCase();

                return (
                  <TableRow key={row.org_app_role_id}>
                    <TableCell>{actualIndex + 1}.</TableCell>

                    <TableCell>
                      {row.role_id.name.toLowerCase().replaceAll(/[-_]/g, " ")}
                    </TableCell>

                    <TableCell>{row.role_id.role_id}</TableCell>
                    <TableCell>{formatDate(row.createdAt)}</TableCell>
                    <TableCell>{formatDate(row.updatedAt)}</TableCell>

                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onView(row.org_app_role_id, row.role_id.role_id)
                        }
                        disabled={!canView}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        color="secondary"
                        onClick={() =>
                          onEdit(row.org_app_role_id, row.role_id.role_id)
                        }
                        disabled={!canEdit || isSelfRole}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => onDelete(row.role_id.role_id)}
                        disabled={!canDelete || isSelfRole || isDeleting}
                      >
                        <DeleteIcon />
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

export default RoleSettingTable;
