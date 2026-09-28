/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/send-lead.php",
        destination: "/api/send-lead",
      },
    ];
  },
};

export default nextConfig;
