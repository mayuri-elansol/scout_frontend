import React, { useState } from "react";
import { Card, Box, Typography } from "@mui/material";
import styles from "./LoginFeatureCard.module.css";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const LoginFeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      elevation={hovered ? 3 : 1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${styles.featureCard} ${hovered ? styles.hovered : ""}`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <Box className={styles.cardContent}>
        <Box className={styles.iconContainer}>{icon}</Box>
        <Box className={styles.textContent}>
          <Typography className={styles.cardTitle}>{title}</Typography>
          <Typography className={styles.cardDescription}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default LoginFeatureCard;
