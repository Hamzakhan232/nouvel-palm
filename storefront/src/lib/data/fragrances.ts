import { sdk } from "@lib/config"

export const listFragrances = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await sdk.client.fetch<{ fragrances: any[]; count: number }>(
      "/store/fragrances",
      {
        method: "GET",
        cache: "no-store",
      }
    )
    console.log("Fetched fragrances:", data)
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching fragrances:", error)
    return { fragrances: [], count: 0, error: String(error) }
  }
}
