/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: 'public'
  },
})

module.exports = nextConfig
