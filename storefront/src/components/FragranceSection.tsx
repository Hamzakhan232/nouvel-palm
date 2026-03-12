import React from "react"
import { listFragrances } from "@lib/data/fragrances"
import { FragranceCard } from "./FragranceCard"
import { Layout, LayoutColumn } from "./Layout"

export const FragranceSection = async () => {
  const { fragrances } = await listFragrances()

  if (!fragrances || fragrances.length === 0) {
    return null
  }

  return (
    <div className="py-16 md:py-0 bg-white">
      <Layout>
        <LayoutColumn>
          <h4 className="text-md md:text-2xl mb-8 md:mb-16">
            Fragrances
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {fragrances.map((fragrance) => (
              <FragranceCard key={fragrance.id} fragrance={fragrance} />
            ))}
          </div>
        </LayoutColumn>
      </Layout>
    </div>
  )
}
