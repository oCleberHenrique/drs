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
        pathname: '/media/**',
      }
    ],
  },
  // O SEGredo ESTÁ AQUI EMBAIXO:
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://31.97.242.139:8000/api/:path*',
      },
      {
        source: '/media/:path*',
        destination: 'http://31.97.242.139:8000/media/:path*',
      },
    ];
  },
};

export default nextConfig;