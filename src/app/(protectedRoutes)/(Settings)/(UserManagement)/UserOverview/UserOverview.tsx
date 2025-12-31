'use client';

import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import SettingTable from "@/app/components/organisms/SettingTable/SettingTable";
import { RootState } from "@/app/store/store";
import { useGetUserOverviewQuery } from "./UserOverviewApi";
import type { BackendUser } from "./UserOverviewApi";
import Loader from "@/app/components/atoms/Loader/Loader";

/** Table-only user */
interface TableUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const UserOverview: React.FC = () => {
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId = user?.org_id;
  const userId = user?.userId;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetUserOverviewQuery(
    { tenantId: tenantId!, userId: userId! },
    { skip: !tenantId || !userId }
  );

  /** ✅ Backend users */
  const backendUsers: BackendUser[] = data?.data ?? [];

  /** ✅ Map backend → table */
  const users: TableUser[] = backendUsers.map((u) => ({
    firstName: u.first_name ?? "",
    lastName: u.last_name ?? "",
    email: u.email,
    phone: u.phoneNumber,
  }));

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

  const handleDelete = (index: number) => {
    const selectedUser = backendUsers[index];
    if (!selectedUser) return;

    if (!confirm("Do you really want to delete this user?")) return;
    console.log("Delete user:", selectedUser.userId);
  };

  if (isLoading) {
    return (
        <Loader />
    );
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
          onDelete={handleDelete}
        />
      )}

      {users.length === 0 && !isError && (
        <Typography color="text.secondary">No users found.</Typography>
      )}

      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          onClick={() => router.push("/AddUser")}
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default UserOverview;
