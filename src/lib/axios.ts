import axios from "axios"

const DEFAULT_API_BASE_URL = "https://st-brains-model-college-be.onrender.com/api/v1"

const resolveApiBaseUrl = (): string => {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || process.env.API_BASE_URL?.trim()

  if (configuredBaseUrl) {
    const isLocalhost = /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(
      configuredBaseUrl,
    )

    if (!isLocalhost) {
      return configuredBaseUrl
    }
  }

  return DEFAULT_API_BASE_URL
}

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
