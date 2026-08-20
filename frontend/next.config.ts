/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: isStaticExport,
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  ...(isStaticExport
    ? {}
    : {
        async rewrites() {
          const backend = process.env.BACKEND_URL || 'http://localhost:5000';
          return [
            {
              source: '/api/:path*',
              destination: `${backend}/api/:path*`,
            },
          ];
        },
      }),
};

export default nextConfig;
