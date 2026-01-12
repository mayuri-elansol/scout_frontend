

"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  CloudUpload,
  Person,
  Lock,
  AssignmentInd,
  CameraAlt,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { showToast } from "@/app/store/slices/toasterSlice";
import Loader from "@/app/components/atoms/Loader/Loader";
import styles from "./EditUser.module.css";

import {
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetUserRoleByUserIdQuery,
} from "./EditUserApi";
import { useRoleListQuery } from "../../../(RoleManagement)/RoleOverview/RoleOverviewApi";

interface UserFormValues {
  orgAppRoleId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  userName: string;
  password: string;
}

const EditUser: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  /** ✅ ROUTE PARAM (FIXED) */
  const targetUserId = params?.targetUserId as string;

  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId = user?.org_id;
  const loggedInUserId = user?.userId;

  const [editUser, { isLoading: isSubmitting }] = useEditUserMutation();

  /** 🔹 USER INFO */
  const { data: userData, isLoading: isUserLoading } = useGetUserByIdQuery(
    { tenantId: tenantId!, userId: loggedInUserId!, targetUserId },
    { skip: !tenantId || !loggedInUserId || !targetUserId }
  );

  /** 🔹 USER ROLE (SELECTED ROLE) */
  const { data: userRoleData, isLoading: isUserRoleLoading } =
    useGetUserRoleByUserIdQuery(
      { userId: targetUserId!, orgId: tenantId! },
      { skip: !tenantId || !targetUserId }
    );

  /** 🔹 ALL ROLES (DROPDOWN OPTIONS) */
  const { data: roleData, isLoading: isRoleLoading } = useRoleListQuery(
    { tenantId: tenantId!, userId: loggedInUserId! },
    { skip: !tenantId || !loggedInUserId }
  );

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<UserFormValues>({
    defaultValues: {
      orgAppRoleId: "",
      firstName: "",
      lastName: "",
      email: "",
      employeeId: "",
      phone: "",
      userName: "",
      password: "",
    },
  });

  /** ✅ PREFILL USER INFO */
  useEffect(() => {
    if (!userData?.data) return;

    const u = userData.data;

    reset((prev) => ({
      ...prev,
      firstName: u.first_name ?? "",
      lastName: u.last_name ?? "",
      email: u.email ?? "",
      employeeId: u.employee_id ?? "",
      phone: u.phoneNumber ?? "",
      userName: u.userName ?? "",
    }));
  }, [userData, reset]);

  /** ✅ PREFILL SELECTED ROLE */
  useEffect(() => {
    if (!userRoleData?.data?.data?.length) return;

    const selectedRoleId = userRoleData.data.data[0].orgAppRole.org_app_role_id;

    reset((prev) => ({
      ...prev,
      orgAppRoleId: selectedRoleId,
    }));
  }, [userRoleData, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /** ✅ SUBMIT */
  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    try {
      await editUser({
        payload: {
          orgAppRoleId: data.orgAppRoleId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          employeeId: data.employeeId,
          phone: data.phone,
          userName: data.userName,
          orgId: tenantId!,
          targetUserId,
        },
        image: profileImage ?? undefined,
      }).unwrap();

      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: "User updated successfully",
          severity: "success",
        })
      );

      router.push("/UserOverview");
    } catch (err: any) {
      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: err?.data?.message || "Failed to update user",
          severity: "error",
        })
      );
    }
  };

  if (isUserLoading || isUserRoleLoading || isRoleLoading) {
    return <Loader />;
  }

  return (
    <Paper sx={{ p: 2, m: 1.5 }}>
      <Box className={styles.formWrapper}>
        {/* ROLE */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <AssignmentInd color="primary" />
            <Typography variant="subtitle1">Select Role</Typography>
          </Box>
          <FormControl fullWidth required disabled>
            <InputLabel>Role</InputLabel>
            <Controller
              name="orgAppRoleId"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Role">
                  {roleData?.data?.data?.map((r: any) => (
                    <MenuItem key={r.org_app_role_id} value={r.org_app_role_id}>
                      {r.role_id?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>

        {/* USER INFO */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <Person color="primary" />
            <Typography variant="subtitle1">User Information</Typography>
          </Box>
          <Grid container spacing={3}>
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["employeeId", "Employee ID"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([name, label]) => (
              <Grid key={name} size={{ xs: 12, md: 3 }}>
                <Controller
                  name={name as keyof UserFormValues}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label={label} fullWidth />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CREDENTIALS */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <Lock color="primary" />
            <Typography variant="subtitle1">Credentials</Typography>
          </Box>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Username" fullWidth />
            )}
          />
        </Box>

        {/* PROFILE IMAGE */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <CameraAlt color="primary" />
            <Typography variant="subtitle1">Profile Picture</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={imagePreview ?? ""} sx={{ width: 100, height: 100 }} />
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Upload
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
        </Box>

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => router.push("/UserOverview")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Update"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditUser;
