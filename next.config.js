const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`
  },
  images: {
    domains: ['assets.vercel.com', "lh3.googleusercontent.com", "cdn.sanity.io"],
    formats: ['image/avif', 'image/webp'],
  },
}
