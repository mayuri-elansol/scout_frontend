'use client';

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
    Visibility,
    VisibilityOff,
    CloudUpload,
    Person,
    Lock,
    Business,
    AssignmentInd,
    CameraAlt,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Avatar,
    InputAdornment
} from "@mui/material";
import styles from "./UserManagement.module.css";
import Appbar from "@/app/components/organisms/AppBar/AppBar";
import { useRouter } from "next/navigation";

interface UserFormValues {
    role: "Organisation Admin" | "Site Manager" | "Department Head" | "Team Lead" | "Employee";
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    site: string;
    department: string;
}

const roles: UserFormValues["role"][] = ["Organisation Admin", "Site Manager", "Department Head", "Team Lead", "Employee"];
const sites: string[] = ["Headquarters", "Mumbai Office", "Delhi Branch", "Bangalore Hub", "Remote Location"];
const departments: string[] = ["Human Resources", "Information Technology", "Finance", "Operations", "Marketing", "Sales"];

const UserManagement: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
  console.log(profileImage)

    const { control, handleSubmit, formState: { errors }, reset } = useForm<UserFormValues>({
        defaultValues: {
            role: "Organisation Admin",
            name: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            site: "",
            department: "",
        },
    });

    const router = useRouter();

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

    const onSubmit: SubmitHandler<UserFormValues> = (data) => {
        const newUser = { ...data, profileImage: imagePreview };
        console.log("New User Added:", newUser);

        alert("User added successfully!");
        reset();
        setImagePreview(null);
        setProfileImage(null);

        router.push("/UserOverview");
    };

    return (
        <Box className={styles.formWrapper}>
            <Appbar title="Add User" />

            {/* Role Section */}
            <Box className={styles.section}>
                <Box className={styles.sectionHeader}>
                    <AssignmentInd color="primary" />
                    <Typography variant="subtitle1">Select Role</Typography>
                </Box>
                <FormControl fullWidth required margin="dense">
                    <InputLabel>Role</InputLabel>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                            <Select {...field} label="Role">
                                {roles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                            </Select>
                        )}
                    />
                    {errors.role && <Typography color="error">{errors.role.message}</Typography>}
                </FormControl>
            </Box>

            {/* User Information */}
            <Box className={styles.section}>
                <Box className={styles.sectionHeader}>
                    <Person color="primary" />
                    <Typography variant="subtitle1">User Information</Typography>
                </Box>
                <Box className={styles.row}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Name"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Email"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Phone is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Phone"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                required
                            />
                        )}
                    />
                </Box>
            </Box>

            {/* Credentials */}
            <Box className={styles.section}>
                <Box className={styles.sectionHeader}>
                    <Lock color="primary" />
                    <Typography variant="subtitle1">Credentials</Typography>
                </Box>
                <Box className={styles.row}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: "Username is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Username"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Password is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>

            {/* Organisation Hierarchy */}
            <Box className={styles.section}>
                <Box className={styles.sectionHeader}>
                    <Business color="primary" />
                    <Typography variant="subtitle1">Organisation Hierarchy</Typography>
                </Box>
                <Box className={styles.row}>
                    <FormControl fullWidth required margin="dense">
                        <InputLabel>Site</InputLabel>
                        <Controller
                            name="site"
                            control={control}
                            rules={{ required: "Site is required" }}
                            render={({ field }) => (
                                <Select {...field} label="Site">
                                    {sites.map(site => <MenuItem key={site} value={site}>{site}</MenuItem>)}
                                </Select>
                            )}
                        />
                        {errors.site && <Typography color="error">{errors.site.message}</Typography>}
                    </FormControl>

                    <FormControl fullWidth required margin="dense">
                        <InputLabel>Department</InputLabel>
                        <Controller
                            name="department"
                            control={control}
                            rules={{ required: "Department is required" }}
                            render={({ field }) => (
                                <Select {...field} label="Department">
                                    {departments.map(dept => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
                                </Select>
                            )}
                        />
                        {errors.department && <Typography color="error">{errors.department.message}</Typography>}
                    </FormControl>
                </Box>
            </Box>

            {/* Upload Profile Picture + Submit */}
            <Box className={styles.section}>
                <Box className={styles.sectionHeader}>
                    <CameraAlt color="primary" />
                    <Typography variant="subtitle1">Upload Profile Picture</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={imagePreview || ""} sx={{ width: 100, height: 100 }} />
                    <Button variant="outlined" component="label" startIcon={<CloudUpload />}>
                        Upload<input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                </Box>
            </Box>

            {/* Submit + Back buttons */}
            <Box textAlign="center" mt={-2} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => router.push("/UserOverview")}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    className={styles.submitButton}
                    onClick={handleSubmit(onSubmit)}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default UserManagement;
