/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image-cdn.essentiallysports.com', 'www.staging.essentiallysports.com'],
  },
}

module.exports = nextConfig
