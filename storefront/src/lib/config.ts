import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

console.log("MEDUSA_BACKEND_URL:", MEDUSA_BACKEND_URL)
console.log("MEDUSA_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY)

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: true,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
