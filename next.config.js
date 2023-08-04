/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_DB_URI: "mongodb://root:rootpassword@localhost:27017/",
  },
};

module.exports = nextConfig;
