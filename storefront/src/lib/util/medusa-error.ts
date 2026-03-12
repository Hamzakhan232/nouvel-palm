// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function medusaError(error: any): never {
  console.error("Medusa Error Object:", error)
  console.error("Error Type:", error?.constructor?.name)
  console.error("Error Keys:", Object.keys(error || {}))

  if (error.response) {
    // Axios-style error
    console.error("DEBUG_MEDUSA_ERROR - Axios Response Error")
    const u = new URL(error.config.url, error.config.baseURL)
    console.error("Resource:", u.toString())
    console.error("Response data:", error.response.data)
    console.error("Status code:", error.response.status)

    const message = error.response.data.message || error.response.data
    throw new Error("DEBUG_MEDUSA_ERROR: " + message.charAt(0).toUpperCase() + message.slice(1) + ".")
  } else if (error.status) {
    // Potential Fetch/SDK style error
    console.error("DEBUG_MEDUSA_ERROR - SDK/Fetch Error - Status:", error.status)
    console.error("DEBUG_MEDUSA_ERROR - SDK/Fetch Error - Message:", error.message)

    throw new Error(`DEBUG_MEDUSA_ERROR: Server responded with status ${error.status}: ${error.message || "An unknown error occurred"}`)
  } else if (error.request) {
    // Axios-style request error
    console.error("DEBUG_MEDUSA_ERROR - Axios Request Error")
    throw new Error("DEBUG_MEDUSA_ERROR: No response received from server. Please check your backend connection.")
  } else {
    // Unknown error type
    console.error("DEBUG_MEDUSA_ERROR - Unknown Error Structure")
    console.error("Error keys:", Object.keys(error || {}))

    const descriptiveMessage = "An unknown error occurred"
    // try {
    //   descriptiveMessage = error.message || JSON.stringify(error)
    // } catch (e) {
    //   console.log("DEBUG_MEDUSA_ERROR - Failed to stringify error object:", e.toString())
    //   descriptiveMessage = "Cyclic or non-stringifiable error object"
    // }

    if (error instanceof Error) {
      console.error("DEBUG_MEDUSA_ERROR - Message:", error.message)
      console.error("DEBUG_MEDUSA_ERROR - Stack:", error.stack)
    }

    throw new Error("DEBUG_MEDUSA_ERROR: " + descriptiveMessage)
  }
}
