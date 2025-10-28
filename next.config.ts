import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      
        // pathname: '/diibo0iyi/image/upload/v1761378821/hz8pmqm299sdlj9monra.jpg',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
