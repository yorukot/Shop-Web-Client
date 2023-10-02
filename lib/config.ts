const env = process.env.NODE_ENV

export const API_URL = (env == "development" ? 'https://my-computer.nightcat.xyz/api': '')
export const WEBSITE_URL = 'https://my-computer.nightcat.xyz/'