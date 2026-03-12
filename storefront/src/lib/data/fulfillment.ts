import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

// Shipping actions
export const listCartShippingMethods = async function (cartId: string) {
  try {
    console.log(`[Fulfillment] Fetching shipping methods for cart: ${cartId}`)
    const response = await sdk.client
      .fetch<HttpTypes.StoreShippingOptionListResponse>(
        `/store/shipping-options`,
        {
          query: { cart_id: cartId },
          next: { tags: ["shipping"] },
          cache: "force-cache",
        }
      )
    console.log(`[Fulfillment] Shipping options response:`, response)
    
    if (!response.shipping_options || response.shipping_options.length === 0) {
      console.warn(
        `[Fulfillment] No shipping options available for cart ${cartId}. ` +
        `This could mean: 1) No shipping methods are configured in the backend, ` +
        `2) The cart doesn't have a valid shipping address, or 3) The region doesn't support shipping.`
      )
    }
    
    return response.shipping_options
  } catch (error) {
    console.error(`[Fulfillment] Error fetching shipping methods for cart ${cartId}:`, error)
    console.error(
      `[Fulfillment] Please ensure: 1) Your backend is running, ` +
      `2) Shipping methods are configured in your Medusa backend, ` +
      `3) The region has valid shipping options`
    )
    return null
  }
}
