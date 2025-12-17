import { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  assetPrefix: "/",
  basePath: "",
  // i18n: i18nConfig.i18n,
  allowedDevOrigins: ["*"],
  devIndicators: false,
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
};
