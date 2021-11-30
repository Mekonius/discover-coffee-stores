module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  target: "serverless",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
};