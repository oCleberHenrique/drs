/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '31.97.242.139',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'dsr.v4jasson.com.br', 
        port: '',
        pathname: '/media/**',
      }
    ],
  },
};

export default nextConfig;