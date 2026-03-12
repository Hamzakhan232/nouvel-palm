"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { twJoin } from "tailwind-merge"
import { Button } from "@/components/Button"
import { StoreCart } from "@medusajs/types"

const Shipping = ({ cart }: { cart: StoreCart }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "shipping"

  const handleSkipShipping = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  return (
    <>
      <div className="flex justify-between mb-6 md:mb-8 border-t border-grayscale-200 pt-8 mt-8">
        <div>
          <p
            className={twJoin(
              "transition-fontWeight duration-75",
              isOpen && "font-semibold"
            )}
          >
            3. Shipping
          </p>
        </div>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Button
              variant="link"
              onPress={() => {
                router.push(pathname + "?step=shipping", { scroll: false })
              }}
            >
              Change
            </Button>
          )}
      </div>
      {isOpen ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            🚀 Coming Soon
          </h3>
          <p className="text-blue-900 mb-4">
            Shipping methods will be implemented in the next release. For now, your order will proceed without shipping selection.
          </p>
          <p className="text-sm text-blue-800 mb-6">
            We&apos;re working hard to bring you a full shipping experience with multiple delivery options.
          </p>
          <Button onPress={handleSkipShipping}>
            Continue to Payment
          </Button>
        </div>
      ) : cart?.shipping_address && cart?.billing_address ? (
        <ul className="flex max-sm:flex-col flex-wrap gap-y-2 gap-x-28">
          <li className="text-grayscale-500">Shipping</li>
          <li className="text-grayscale-600">To be determined at delivery</li>
        </ul>
      ) : null}
    </>
  )
}

export default Shipping
