/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                "source": "/mailto:path*",
                "destination": "/mailto?path=:path*"
            }
        ]
    }
}

module.exports = nextConfig
