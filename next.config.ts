import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve Node.js specific modules on the client
      config.resolve.fallback = {
        dns: false,
        fs: false,
        net: false,
        tls: false,
        pg: false,
        'pg-native': false,
        'pg-hstore': false,
      };
    }
    return config;
  },
  // Set the correct root directory to fix the workspace warning
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
