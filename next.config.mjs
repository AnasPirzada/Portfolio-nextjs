import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            // Allow microphone on this origin (required for Web Speech / getUserMedia)
            // Keep camera and geolocation disabled for security
            value: 'camera=(), microphone=(self), geolocation=()',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/sounds/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'audio/mpeg',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Get webpack from Next.js internal compilation
    const webpack = require('next/dist/compiled/webpack/webpack-lib.js');

    // Audio file handling
    config.module.rules.push({
      test: /\.(mp3|wav)$/i,
      use: {
        loader: 'url-loader',
      },
    });

    // Fix for ElevenLabs SDK - exclude Node.js-only modules on client-side
    if (!isServer) {
      const emptyModulePath = require.resolve('./empty-module.js');

      // Ignore ALL Node.js-only wrapper files BEFORE they're parsed
      config.plugins.push(
        // Ignore realtime wrapper entirely (most aggressive - catches everything)
        new webpack.IgnorePlugin({
          resourceRegExp: /realtime/,
          contextRegExp: /@elevenlabs\/elevenlabs-js/,
        }),
        // Ignore speechToText wrapper (also imports realtime)
        new webpack.IgnorePlugin({
          resourceRegExp: /speechToText/,
          contextRegExp: /@elevenlabs\/elevenlabs-js/,
        }),
        // Ignore play.js wrapper
        new webpack.IgnorePlugin({
          resourceRegExp: /wrapper\/play\.js$/,
          contextRegExp: /@elevenlabs\/elevenlabs-js/,
        }),
        // Ignore the entire wrapper/realtime directory
        new webpack.IgnorePlugin({
          resourceRegExp: /wrapper\/realtime/,
          contextRegExp: /@elevenlabs\/elevenlabs-js/,
        }),
        // Replace the play.js file with empty module (backup)
        new webpack.NormalModuleReplacementPlugin(
          /@elevenlabs\/elevenlabs-js\/wrapper\/play\.js$/,
          emptyModulePath
        ),
        // Replace realtime connection.js which imports node:child_process
        new webpack.NormalModuleReplacementPlugin(
          /@elevenlabs\/elevenlabs-js\/wrapper\/realtime/,
          emptyModulePath
        ),
        // Replace speechToText wrapper
        new webpack.NormalModuleReplacementPlugin(
          /@elevenlabs\/elevenlabs-js\/wrapper\/speechToText/,
          emptyModulePath
        ),
        // Replace node:child_process imports with empty module (handles node: protocol)
        new webpack.NormalModuleReplacementPlugin(
          /^node:child_process$/,
          emptyModulePath
        ),
        // Replace node:fs imports
        new webpack.NormalModuleReplacementPlugin(
          /^node:fs$/,
          emptyModulePath
        ),
        // Replace node:net imports
        new webpack.NormalModuleReplacementPlugin(
          /^node:net$/,
          emptyModulePath
        ),
        // Replace node:tls imports
        new webpack.NormalModuleReplacementPlugin(
          /^node:tls$/,
          emptyModulePath
        )
      );

      // Alias node: protocol imports to empty module (handles resolution)
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:child_process': emptyModulePath,
        'node:fs': emptyModulePath,
        'node:net': emptyModulePath,
        'node:tls': emptyModulePath,
      };

      // Set fallbacks for Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        'node:child_process': false,
        'node:fs': false,
        'node:net': false,
        'node:tls': false,
      };

      // Mark node: modules as external (don't try to bundle them)
      config.externals = config.externals || [];
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = [
          originalExternals,
          ({ request }, callback) => {
            if (request && request.startsWith('node:')) {
              return callback(null, `commonjs ${emptyModulePath}`);
            }
            callback();
          },
        ];
      } else if (Array.isArray(config.externals)) {
        config.externals.push(({ request }, callback) => {
          if (request && request.startsWith('node:')) {
            return callback(null, `commonjs ${emptyModulePath}`);
          }
          callback();
        });
      }
    }

    return config;
  },

  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to constructor errors
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
