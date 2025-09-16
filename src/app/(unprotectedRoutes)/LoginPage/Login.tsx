// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Card,
//   Container,
//   ThemeProvider,
//   CssBaseline,
//   Paper,
//   Typography,
// } from "@mui/material";
// import { theme } from "@/app/theme/theme";
// import LoginHeader from "../../components/molecules/Login/LoginHeader";
// import LoginForm from "../../components/molecules/Login/LoginForm";
// import { Shield } from "@mui/icons-material";

// interface LoginFormData {
//   username: string;
//   password: string;
//   rememberMe: boolean;
// }

// interface User {
//   username: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const router = useRouter();
//   const [cardHovered, setCardHovered] = useState(false);
//   const [formData, setFormData] = useState<LoginFormData>({
//     username: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string>("");

//   const currentDateTime = new Date().toLocaleString("en-GB", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   });

//   const handleInputChange =
//     (field: keyof LoginFormData) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const value =
//         event.target.type === "checkbox"
//           ? event.target.checked
//           : event.target.value;
//       setFormData((prev) => ({ ...prev, [field]: value }));
//       if (error) setError("");
//     };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const response = await fetch("/data/user.json");
//       const users: User[] = await response.json();

//       const foundUser = users.find(
//         (u) =>
//           u.username === formData.username && u.password === formData.password
//       );

//       if (foundUser) {
//         const token = `token-${Date.now()}`;
//         localStorage.setItem("scout_auth_token", token);
//         localStorage.setItem(
//           "scout_user",
//           JSON.stringify({
//             username: foundUser.username,
//             lastLogin: new Date().toISOString(),
//           })
//         );
//         router.push("/DashboardPage");
//       } else {
//         setError("Invalid username or password");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
//         <LoginHeader currentDateTime={currentDateTime} />
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             minHeight: "calc(100vh - 88px)",
//             padding: 4,
//           }}
//         >
//           <Container maxWidth="sm">
//             <Card
//               elevation={cardHovered ? 4 : 2}
//               onMouseEnter={() => setCardHovered(true)}
//               onMouseLeave={() => setCardHovered(false)}
//               sx={{
//                 borderRadius: 2,
//                 maxWidth: 520,
//                 margin: "0 auto",
//                 backgroundColor: "#ffffff",
//                 border: "1px solid rgba(255, 255, 255, 0.8)",
//                 transform: cardHovered ? "translateY(0px)" : "translateY(0)",
//                 boxShadow: cardHovered
//                   ? "0 8px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(25, 118, 210, 0.1)"
//                   : "0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
//                 "&::before": {
//                   content: '""',
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: "4px",
//                   background:
//                     "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
//                   borderRadius: "8px 8px 0 0",
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   padding: 4,
//                   paddingTop: 5,
//                   textAlign: "center",
//                   backgroundColor: "#ffffff",
//                   borderBottom: "1px solid #f0f0f0",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     backgroundColor: "#1976d2",
//                     borderRadius: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "white",
//                     margin: "0 auto 20px",
//                   }}
//                 >
//                   <Shield sx={{ fontSize: 28 }} />
//                 </Box>
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontWeight: 700,
//                     mb: 1,
//                     color: "#000000",
//                     fontSize: "28px",
//                   }}
//                 >
//                   Sign in to SCOUT
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   sx={{ color: "#5c6b7d", fontSize: "16px" }}
//                 >
//                   Sign in to access your SCOUT dashboard
//                 </Typography>
//               </Box>

//               <LoginForm
//                 formData={formData}
//                 showPassword={showPassword}
//                 isLoading={isLoading}
//                 error={error}
//                 onInputChange={handleInputChange}
//                 onTogglePassword={handleTogglePassword}
//                 onSubmit={handleSubmit}
//                 setError={setError}
//               />

//               <Paper
//                 sx={{
//                   textAlign: "center",
//                   py: 3,
//                   backgroundColor: "#fafafa",
//                   borderTop: "1px solid #f0f0f0",
//                   borderRadius: "0 0 8px 8px",
//                 }}
//                 elevation={0}
//               >
//                 <Typography
//                   variant="body2"
//                   sx={{ color: "#6b7280", fontSize: "13px", fontWeight: 500 }}
//                 >
//                   © 2025 SCOUT Security System. All rights reserved.
//                 </Typography>
//               </Paper>
//             </Card>
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default Login;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Container,
  ThemeProvider,
  CssBaseline,
  Paper,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "../../components/molecules/Login/LoginForm";
import {

  Analytics,
  NotificationsActive,
  Search,
  Security,
  SmartToy,
  Timeline,
  CameraAlt
} from "@mui/icons-material";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface User {
  username: string;
  password: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      elevation={hovered ? 3 : 1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        p: 2.5,
        height: '100%',
        borderRadius: 2,
        border: '1px solid #e3f2fd',
        borderLeft: '4px solid #1976d2',
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(66, 165, 245, 0.05) 100%)',
        transform: hovered ? 'translateY(-2px) translateX(2px)' : 'translateY(0) translateX(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `slideInLeft 0.6s ease-out ${delay}ms both`,
        '@keyframes slideInLeft': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-30px) translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0) translateY(0)',
          },
        },
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.08) 100%)',
          borderLeft: '4px solid #42a5f5',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0,
            boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)',
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1976d2',
              fontSize: '1rem',
              mb: 0.5,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#5c6b7d',
              fontSize: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

const Login: React.FC = () => {
  const router = useRouter();
  const [cardHovered, setCardHovered] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const currentDateTime = new Date().toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const features = [
    {
      icon: <SmartToy sx={{ fontSize: 20 }} />,
      title: "AI-Powered Detection",
      description: "Advanced computer vision algorithms for real-time object, person, and anomaly detection across multiple camera feeds.",
    },
    {
      icon: <Analytics sx={{ fontSize: 20 }} />,
      title: "Smart Analytics Dashboard",
      description: "Comprehensive reporting with heat maps, traffic patterns, and behavioral analysis for data-driven security decisions.",
    },
    {
      icon: <NotificationsActive sx={{ fontSize: 20 }} />,
      title: "Real-Time Alerts",
      description: "Instant notifications for security breaches, unusual activities, and predefined events with customizable alert thresholds.",
    },
    {
      icon: <Search sx={{ fontSize: 20 }} />,
      title: "Advanced Search & Forensics",
      description: "Powerful search capabilities with facial recognition, license plate detection, and timeline-based investigation tools.",
    },
  ];

  const handleInputChange =
    (field: keyof LoginFormData) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value =
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (error) setError("");
      };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/data/user.json");
      const users: User[] = await response.json();

      const foundUser = users.find(
        (u) =>
          u.username === formData.username && u.password === formData.password
      );

      if (foundUser) {
        const token = `token-${Date.now()}`;
        localStorage.setItem("scout_auth_token", token);
        localStorage.setItem(
          "scout_user",
          JSON.stringify({
            username: foundUser.username,
            lastLogin: new Date().toISOString(),
          })
        );
        router.push("/DashboardPage");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        // sx={{
        //   minHeight: "100vh",
        //   background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1976d2 100%)',
        //   position: 'relative',
        //   '&::before': {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
        //     opacity: 0.5,
        //   }
        // }}
        sx={{
          minHeight: "100vh",
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1976d2 100%)',
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236b7280" fill-opacity="0.04"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
            opacity: 0.2,
          },
        }}
      >
        {/* <LoginHeader currentDateTime={currentDateTime} /> */}

        <Container maxWidth={false} sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} sx={{ minHeight: "calc(100vh - 150px)", alignItems: 'center' }}>
            {/* Left Section - Features */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box sx={{
                pr: { lg: 4 }, color: 'white', ml: "40px"}}>

                <Box sx={{ mb: 4, textAlign: { xs: 'center', lg: 'left' } }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      mb: 2,
                      background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                      animation: 'fadeInUp 0.8s ease-out',
                      '@keyframes fadeInUp': {
                        '0%': {
                          opacity: 0,
                          transform: 'translateY(30px)',
                        },
                        '100%': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                    }}
                  >
                    SCOUT
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: '#e3f2fd',
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      animation: 'fadeInUp 0.8s ease-out 0.2s both',
                    }}
                  >
                    From Surveillance to Intelligence
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 3,
                      maxWidth: '600px',
                      mx: { xs: 'auto', lg: 0 },
                      animation: 'fadeInUp 0.8s ease-out 0.4s both',
                    }}
                  >
                    Your Smart CCTV Analysis Partner. SCOUT transforms traditional surveillance into intelligent monitoring,
                    delivering real-time insights, automated threat detection, and comprehensive analytics for enhanced security operations.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                    <Chip
                      icon={<CameraAlt />}
                      label="Multi-Camera Support"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    />
                    <Chip
                      icon={<Timeline />}
                      label="24/7 Monitoring"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    />

                    <Chip
                      icon={<Security />}
                      label="Enterprise Security"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {features.map((feature, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={feature.title}>
                      <FeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        delay={index * 150}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Right Section - Login Form */}
            <Grid size={{ xs: 12, lg: 5 }} >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  elevation={cardHovered ? 8 : 4}
                  onMouseEnter={() => setCardHovered(true)}
                  onMouseLeave={() => setCardHovered(false)}
                  sx={{
                    borderRadius: 3,
                    maxWidth: 480,
                    width: '100%',
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: 'blur(20px)',
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    transform: cardHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: cardHovered
                      ? "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(25, 118, 210, 0.1)"
                      : "0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.06)",
                    animation: 'slideInRight 0.8s ease-out 0.6s both',
                    '@keyframes slideInRight': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateX(50px) translateY(20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateX(0) translateY(0)',
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                      borderRadius: "12px 12px 0 0",
                    },
                  }}
                >
                  <Box
                    sx={{
                      padding: 4,
                      paddingTop: 5,
                      textAlign: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderBottom: "1px solid rgba(240, 240, 240, 0.8)",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    <Box
                    // sx={{
                    //   width: 64,
                    //   height: 64,
                    //   background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    //   borderRadius: 2,
                    //   display: "flex",
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    //   color: "white",
                    //   margin: "0 auto 24px",
                    //   boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                    // }}
                    >
                      {/* <Shield sx={{ fontSize: 32 }} /> */}
                      <Box
                        component="img"
                        src="/icon.png"
                        alt="Elansol Logo"
                        sx={{ height: 50, width: "auto" }}
                        loading="lazy"
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#1976d2",
                        fontSize: "28px",
                      }}
                    >
                      Welcome Back
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#5c6b7d", fontSize: "16px" }}
                    >
                      Sign in to access your surveillance analytics portal
                    </Typography>
                  </Box>

                  <LoginForm
                    formData={formData}
                    showPassword={showPassword}
                    isLoading={isLoading}
                    error={error}
                    onInputChange={handleInputChange}
                    onTogglePassword={handleTogglePassword}
                    onSubmit={handleSubmit}
                    setError={setError}
                  />

                  <Paper
                    sx={{
                      textAlign: "center",
                      py: 3,
                      backgroundColor: "rgba(250, 250, 250, 0.9)",
                      borderTop: "1px solid rgba(240, 240, 240, 0.8)",
                      borderRadius: "0 0 12px 12px",
                      backdropFilter: 'blur(10px)',
                    }}
                    elevation={0}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                      <Security sx={{ fontSize: 16, color: '#28a745' }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#28a745", fontSize: "12px", fontWeight: 600 }}
                      >
                        Secured with end-to-end encryption
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#6b7280", fontSize: "13px", fontWeight: 500 }}
                    >
                      © 2025 SCOUT Security System. All rights reserved.
                    </Typography>
                  </Paper>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;