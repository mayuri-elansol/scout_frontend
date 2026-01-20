

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
  MenuItem,
  Button,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { showToast } from "@/app/store/slices/toasterSlice";
import styles from "./EditUser.module.css";

import {
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetUserRoleByUserIdQuery,
} from "./EditUserApi";
import { useRoleListQuery } from "../../../(RoleManagement)/RoleOverview/RoleOverviewApi";
import { getErrorMessage } from "@/utils/getErrorMessage";

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

  const targetUserId = params?.targetUserId as string;

  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId = user?.org_id;
  const loggedInUserId = user?.userId;

  const [editUser, { isLoading: isSubmitting }] = useEditUserMutation();

  const { data: userData } = useGetUserByIdQuery(
    { tenantId: tenantId!, userId: targetUserId },
    { skip: !tenantId || !loggedInUserId || !targetUserId }
  );

  const { data: userRoleData } = useGetUserRoleByUserIdQuery(
    { userId: targetUserId!, orgId: tenantId! },
    { skip: !tenantId || !targetUserId }
  );

  const { data: roleData } = useRoleListQuery(
    { tenantId: tenantId!, userId: loggedInUserId! },
    { skip: !tenantId || !loggedInUserId }
  );

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { control, handleSubmit, setValue, watch } = useForm<UserFormValues>({
    shouldUnregister: false,
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

  /** ✅ USER ROLE (SOURCE OF TRUTH) */
  const userRole = userRoleData?.data?.data?.[0];
  const userOrgAppRoleId = userRole?.orgAppRole?.org_app_role_id;
  const userRoleName = userRole?.orgAppRole?.role_id?.name;

  /** ✅ PREFILL USER DATA */
  useEffect(() => {
    if (!userData?.data) return;

    const u = userData.data;
    setValue("firstName", u.first_name ?? "");
    setValue("lastName", u.last_name ?? "");
    setValue("email", u.email ?? "");
    setValue("employeeId", u.employee_id ?? "");
    setValue("phone", u.phoneNumber ?? "");
    setValue("userName", u.userName ?? "");
    setImagePreview(u.image_path ?? null);
  }, [userData, setValue]);

  /** ✅ PREFILL ROLE (NO MATCHING) */
  useEffect(() => {
    if (userOrgAppRoleId) {
      setValue("orgAppRoleId", userOrgAppRoleId);
    }
  }, [userOrgAppRoleId, setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
    } catch (err) {
      dispatch(
        showToast({
          id: crypto.randomUUID(),
          message: getErrorMessage(err, "Failed to update user"),
          severity: "error",
        })
      );
    }
  };

  return (
    <Paper sx={{ p: 2, m: 1.5 }}>
      <Box className={styles.formWrapper}>
        {/* ROLE */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <AssignmentInd color="primary" />
            <Typography variant="subtitle1">Role</Typography>
          </Box>
          <Controller
            name="orgAppRoleId"
            control={control}
            render={() => {
              const selectedOrgAppRoleId = watch("orgAppRoleId") || userOrgAppRoleId;

              return (
                <TextField
                  select
                  fullWidth
                  required
                  disabled
                  label="Role"
                  value={selectedOrgAppRoleId}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) => {
                      const selected = value as string; // cast unknown -> string

                      if (selected === userOrgAppRoleId) return userRoleName;

                      const role = roleData?.data?.data?.find(
                        (r) => r.org_app_role_id === selected
                      );

                      return role?.role_id?.name || "";
                    },
                  }}
                >
                  {userOrgAppRoleId && (
                    <MenuItem value={userOrgAppRoleId} sx={{ display: "none" }}>
                      {userRoleName}
                    </MenuItem>
                  )}

                  {roleData?.data?.data?.map((role) => (
                    <MenuItem
                      key={role.org_app_role_id}
                      value={role.org_app_role_id}
                    >
                      {role.role_id.name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }}
          />


        </Box>

        {/* REST OF FORM — UNCHANGED */}
        {/* ... everything else stays exactly the same ... */}
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

        {/* USERNAME */}
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

        {/* IMAGE */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <CameraAlt color="primary" />
            <Typography variant="subtitle1">Profile Picture</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* <Avatar src={imagePreview ?? ""} sx={{ width: 100, height: 100 }} /> */}
            <Avatar
              src={imagePreview ?? ""}
              sx={{ width: 100, height: 100 }}
              imgProps={{
                referrerPolicy: "no-referrer",
              }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Upload
              {/* Wrap the input so JSX spacing is unambiguous */}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
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
