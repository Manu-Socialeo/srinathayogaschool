/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'mdrvawvkeuuzzzuohawt.supabase.co' },
    ],
  },
}

let config = nextConfig
try {
  const { withSentryConfig } = await import('@sentry/nextjs')
  config = withSentryConfig(config, {
    silent: true,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
  })
} catch {}

export default config
