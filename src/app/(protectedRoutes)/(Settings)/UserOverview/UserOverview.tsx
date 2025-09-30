'use client';

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import SettingTable from "@/app/components/organisms/SettingTable/SettingTable";

const UserOverview = () => {
  const [users, setUsers] = useState<any[]>([
    { name: "Prachi", email: "prachi@test.com", phone: "1234567890", role: "Employee" },
    { name: "Admin", email: "admin@test.com", phone: "9876543210", role: "Organisation Admin" },
  ]);

  const router = useRouter();

  const handleEdit = (index: number) => {
    const user = users[index];
    router.push(`/EditUser`);
  };

  const handleDelete = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3 }}>
   

      {users.length > 0 ? (
        <SettingTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <Typography color="text.secondary">No users found.</Typography>
      )}

      {/* ➡️ Button to go back to User Management (Add Role) */}
      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/UserManagement")}
        >
          Add Role
        </Button>
      </Box>
    </Box>
  );
};

export default UserOverview;
