
"use client";

import { v4 as uuidv4 } from "uuid";
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
import styles from "./AddUser.module.css";
import { useRouter } from "next/navigation";
import { useRoleOverviewQuery } from "../../(RoleManagement)/RoleOverview/RoleOverviewApi";
import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useAddUserMutation } from "./AddUseApi";
import { showToast } from "@/app/store/slices/toasterSlice";
import Loader from "@/app/components/atoms/Loader/Loader";

interface UserFormValues {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  userName: string;
  password: string;
}

const generatePassword = () =>
  Math.random().toString(36).slice(-10) + "@A1";

const AddUser: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);
  const tenantId = user?.org_id;
  const userId = user?.userId;

  const [addUser, { isLoading: isSubmitting }] = useAddUserMutation();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data, isLoading } = useRoleOverviewQuery(
    { tenantId: tenantId!, userId: userId! },
    { skip: !tenantId || !userId } 
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormValues>({
    defaultValues: {
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      employeeId: "",
      phone: "",
      userName: "",
      password: "",
    },
  });

  // 🔐 Auto-generate password ONCE
  useEffect(() => {
    setValue("password", generatePassword());
  }, [setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // ✅ FINAL SUBMIT
 const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
  try {
    await addUser({
      payload: {
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        employeeId: data.employeeId,
        phone: data.phone,
        userName: data.userName,
        password: data.password,
        orgId: tenantId!,
      },
      image: profileImage ?? undefined,
    }).unwrap();

    dispatch(
      showToast({
        id: crypto.randomUUID(),
        message: "User added successfully",
        severity: "success",
      })
    );

    reset();
    setProfileImage(null);
    setImagePreview(null);

    router.push("/UserOverview");
  } catch (err: any) {
    console.error(err);

    dispatch(
      showToast({
        id: crypto.randomUUID(),
        message: err?.data?.message || "Failed to add user",
        severity: "error",
      })
    );
  }
};
if(isLoading){
  return <Loader/>
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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select {...field} label="Role" disabled={isLoading}>
                      {data?.data?.data?.map((r: any) => (
                        <MenuItem
                          key={r.role_id?.role_id || uuidv4()}
                          value={r.role_id?.name}
                        >
                          {r.role_id?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* USER INFO – 5 FIELD GRID */}
        <Box className={styles.section}>
          <Box className={styles.sectionHeader}>
            <Person color="primary" />
            <Typography variant="subtitle1">User Information</Typography>
          </Box>

          <Grid container spacing={4}>
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
                  rules={{ required: `${label} is required` }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={label}
                      fullWidth required
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Controller
                name="userName"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password (Auto-generated)"
                    fullWidth 
                    disabled
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>

 
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
          <Button variant="outlined" onClick={() => router.push("/UserOverview")}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddUser;
