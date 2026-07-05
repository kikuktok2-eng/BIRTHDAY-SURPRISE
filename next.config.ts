/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ini akan mengabaikan error TypeScript saat proses build di Vercel
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig