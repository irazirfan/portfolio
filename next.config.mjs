/** @type {import('next').NextConfig} */

// This checks if we are running the 'build' command
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'iONE_portfolio';

const nextConfig = {
  output: 'export',
  // Only use the repo name prefix if we are in production (GitHub Pages)
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig