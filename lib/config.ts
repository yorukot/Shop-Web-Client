const env = process.env.NODE_ENV

export const API_URL = (env === "development" ? 'https://my-computer.nightcat.xyz/api': 'https://shop-web-api.nightcat.xyz/api')
export const WEBSITE_URL = (env === "development" ? 'https://my-computer.nightcat.xyz/': 'https://shop-web-api.nightcat.xyz/api')