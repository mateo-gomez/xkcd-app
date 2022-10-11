/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
};

module.exports = nextConfig;
