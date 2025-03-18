/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // ✅ Redirects API calls to backend
      },
    ];
  },
};

module.exports = nextConfig;
