/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const rewrites = () => {
    return [
      {
        source: "/odata/v4/service/:path*",
        destination: "http://localhost:4004/odata/v4/service/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};

module.exports = nextConfig;
