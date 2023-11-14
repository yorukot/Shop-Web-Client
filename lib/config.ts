const env = process.env.NODE_ENV

export const API_URL = (env === "development" ? 'https://my-computer.nightcat.xyz/api': 'https://pccuhort.com/api')
export const WEBSITE_URL = (env === "development" ? 'https://my-computer.nightcat.xyz/': 'https://pccuhort.com/')