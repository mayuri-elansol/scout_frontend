"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Box, Typography, Grid, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Loader from "@/app/components/atoms/Loader/Loader";
import CardForSettings from "@/app/components/molecules/CardForSettings/CardForSettings";
import {
  useGetFeatureOfRoleByRoleIdMutation,
  useGetRoleQuery,
} from "./ViewRoleApi";
import { RootState } from "@/app/store/store";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { formatDate } from "@/utils/dateUtils";

export default function ViewRolePage() {
  const router = useRouter();
  const params = useParams();

  const tenantId = useSelector((state: RootState) => state.auth.user?.org_id);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const roleId = typeof params?.roleId === "string" ? params.roleId : undefined;

  const orgAppRoleId =
    typeof params?.orgAppRoleId === "string" ? params.orgAppRoleId : undefined;

  /* ---------------- ROLE OVERVIEW API ---------------- */
  const { data, isLoading: isLoadingForRole } = useGetRoleQuery(
    tenantId && userId ? { tenantId, userId } : skipToken
  );

  /* ✅ ADD THIS RIGHT HERE */
  const roleList = data?.data?.data ?? [];

  const selectedRole = React.useMemo(() => {
    return roleList.find((item: any) => item.org_app_role_id === orgAppRoleId);
  }, [roleList, orgAppRoleId]);

  /* ---------------- FEATURE API ---------------- */
  const [fetchFeatures, { isLoading, isError }] =
    useGetFeatureOfRoleByRoleIdMutation();

  const [features, setFeatures] = useState<any[]>([]);

  /* ---------------- FETCH FEATURES ---------------- */
  useEffect(() => {
    if (!tenantId || !roleId || !orgAppRoleId) return;

    fetchFeatures({ tenantId, roleId, orgAppRoleId })
      .unwrap()
      .then((res) => {
        setFeatures(res?.data?.data ?? []);
      });
  }, [tenantId, roleId, orgAppRoleId, fetchFeatures]);

  /* ---------------- LOADING ---------------- */
  if (isLoadingForRole || isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Loader />
      </Box>
    );
  }
  /* ---------------- ERROR ---------------- */
  if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography color="error">Failed to fetch role details.</Typography>
      </Box>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <Box className="viewRole" sx={{ p: 2 }}>
      {/* ---------------- ROLE DETAILS ---------------- */}
      <Typography variant="h6" mb={2}>
        Role Details :
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardForSettings
            title="Role Name"
            text={selectedRole?.role_id?.name}
          />
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardForSettings
            title="Role Description"
            text={selectedRole?.org_app_role_id}
          />
        </Grid> */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardForSettings
            title="Created At"
            text={formatDate(selectedRole?.createdAt)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardForSettings
            title="Updated At"
            text={formatDate(selectedRole?.updatedAt)}
          />
        </Grid>
      </Grid>

      {/* ---------------- ASSIGNED FEATURES ---------------- */}
      <Typography variant="h6" mb={2}>
        Assigned Features :
      </Typography>

      <Grid container spacing={2}>
        {features.map((item: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.role_feature_id}>
            <CardForSettings
              title={item.feature?.name}
              icon={<CheckCircleOutlineIcon color="primary" />}
              text={
                <Typography variant="body2">
                  {item.feature?.description}
                </Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
      {/* ---------------- BACK BUTTON ---------------- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: 4,
        }}
      >
        <Button variant="outlined" onClick={() => router.push("/RoleOverview")}>
          Back
        </Button>
      </Box>
    </Box>
  );
}
