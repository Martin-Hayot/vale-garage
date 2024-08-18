/** @type {import('next').NextConfig} */
const localConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "vale-garage.s3.eu-central-1.amazonaws.com",
            },
        ],
    },
};

const prodConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "vale-garage-prod.s3.eu-central-1.amazonaws.com",
            },
        ],
    },
};

const nextConfig =
    process.env.NODE_ENV === "production" ? prodConfig : localConfig;

module.exports = nextConfig;
