// 'use client';

// import React from "react";
// import { Box, Typography, Button, CircularProgress } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// import SettingTable from "@/app/components/organisms/SettingTable/SettingTable";
// import { RootState } from "@/app/store/store";
// import { useDeleteUserMutation, useGetUserOverviewQuery } from "./UserOverviewApi";
// import type { BackendUser } from "./UserOverviewApi";
// import Loader from "@/app/components/atoms/Loader/Loader";
// import { showToast } from "@/app/store/slices/toasterSlice";

// /** Table-only user */
// interface TableUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// const UserOverview: React.FC = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state: RootState) => state.auth);
//   const tenantId = user?.org_id;
//   const userId = user?.userId;

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useGetUserOverviewQuery(
//     { tenantId: tenantId!, userId: userId! },
//     { skip: !tenantId || !userId }
//   );
// const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

//   /** ✅ Backend users */
//   const backendUsers: BackendUser[] = data?.data ?? [];

//   /** ✅ Map backend → table */
//   const users: TableUser[] = backendUsers.map((u) => ({
//     firstName: u.first_name ?? "",
//     lastName: u.last_name ?? "",
//     email: u.email,
//     phone: u.phoneNumber,
//   }));

//   const handleView = (index: number) => {
//     const selectedUser = backendUsers[index];
//     if (!selectedUser) return;
//     router.push(`/ViewUser/${selectedUser.userId}`);
//   };

//   const handleEdit = (index: number) => {
//     const selectedUser = backendUsers[index];
//     if (!selectedUser) return;
//     router.push(`/EditUser/${selectedUser.userId}`);
//   };

// const handleDelete = async (index: number) => {
//   const selectedUser = backendUsers[index];
//   if (!selectedUser) return;

//   const confirmDelete = confirm(
//     `Do you really want to delete user "${selectedUser.first_name} ${selectedUser.last_name}"?`
//   );
//   if (!confirmDelete) return;

//   try {
//     await deleteUser({
//       tenantId: tenantId!,
//       userId: userId!,
//       targetUserId: selectedUser.userId,
//     }).unwrap();

//     dispatch(
//       showToast({
//         id: crypto.randomUUID(),
//         message: `User "${selectedUser.first_name} ${selectedUser.last_name}" deleted successfully`,
//         severity: "success",
//       })
//     );
//   } catch (err: any) {
//     dispatch(
//       showToast({
//         id: crypto.randomUUID(),
//         message: err?.data?.message || "Failed to delete user",
//         severity: "error",
//       })
//     );
//   }
// };


//   if (isLoading) {
//     return (
//         <Loader />
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       {isError && (
//         <Typography color="error">
//           {(error as any)?.data?.message || "Failed to fetch users"}
//         </Typography>
//       )}

//       {users.length > 0 && (
//         <SettingTable
//           users={users}
//           onView={handleView}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}

//       {users.length === 0 && !isError && (
//         <Typography color="text.secondary">No users found.</Typography>
//       )}

//       <Box textAlign="center" mt={3}>
//         <Button
//           variant="contained"
//           onClick={() => router.push("/AddUser")}
//         >
//           Add User
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default UserOverview;
'use client';

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import SettingTable from "@/app/components/organisms/SettingTable/SettingTable";
import { RootState } from "@/app/store/store";
import { useDeleteUserMutation, useGetUserOverviewQuery } from "./UserOverviewApi";
import type { BackendUser } from "./UserOverviewApi";
import Loader from "@/app/components/atoms/Loader/Loader";
import { showToast } from "@/app/store/slices/toasterSlice";

/** Table-only user */
interface TableUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const UserOverview: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId = user?.org_id;
  const userId = user?.userId;

  const { data, isLoading, isError, error } = useGetUserOverviewQuery(
    { tenantId: tenantId!, userId: userId! },
    { skip: !tenantId || !userId }
  );

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const backendUsers: BackendUser[] = data?.data ?? [];
  const users: TableUser[] = backendUsers.map((u) => ({
    firstName: u.first_name ?? "",
    lastName: u.last_name ?? "",
    email: u.email,
    phone: u.phoneNumber,
  }));

  /** ----- DIALOG STATE ----- */
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  const handleView = (index: number) => {
    const selectedUser = backendUsers[index];
    if (!selectedUser) return;
    router.push(`/ViewUser/${selectedUser.userId}`);
  };

  const handleEdit = (index: number) => {
    const selectedUser = backendUsers[index];
    if (!selectedUser) return;
    router.push(`/EditUser/${selectedUser.userId}`);
  };

  const handleOpenConfirm = (index: number) => {
    setSelectedUserIndex(index);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSelectedUserIndex(null);
    setOpenConfirm(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUserIndex === null) return;
    const selectedUser = backendUsers[selectedUserIndex];

    try {
      await deleteUser({
        tenantId: tenantId!,
        userId: userId!,
        targetUserId: selectedUser.userId,
      }).unwrap();

      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: `User "${selectedUser.first_name} ${selectedUser.last_name}" deleted successfully`,
          severity: "success",
        })
      );
    } catch (err: any) {
      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: err?.data?.message || "Failed to delete user",
          severity: "error",
        })
      );
    } finally {
      handleCloseConfirm();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {isError && (
        <Typography color="error">
          {(error as any)?.data?.message || "Failed to fetch users"}
        </Typography>
      )}

      {users.length > 0 && (
        <SettingTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleOpenConfirm} // <-- OPEN DIALOG
        />
      )}

      {users.length === 0 && !isError && (
        <Typography color="text.secondary">No users found.</Typography>
      )}

      <Box textAlign="center" mt={3}>
        <Button variant="contained" onClick={() => router.push("/AddUser")}>
          Add User
        </Button>
      </Box>

      {/* ---------- CONFIRM DELETE DIALOG ---------- */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserOverview;
