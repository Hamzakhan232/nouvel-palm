import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

import { collectionMetadataCustomFieldsSchema } from "@lib/util/collections"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { LocalizedLink } from "@/components/LocalizedLink"
import { Layout, LayoutColumn } from "@/components/Layout"
import { FragranceSection } from "@/components/FragranceSection"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  materials: {
    id: string
    name: string
    colors: {
      id: string
      name: string
      hex_code: string
    }[]
  }[]
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  materials,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const images = product.images || []
  const hasImages = Boolean(
    product.images &&
    product.images.filter((image) => Boolean(image.url)).length > 0
  )

  const collectionDetails = collectionMetadataCustomFieldsSchema.safeParse(
    product.collection?.metadata ?? {}
  )

  const isStarterKit = (product.variants?.length ?? 0) > 1


  console.log(isStarterKit)

  return (

    <div
      className="pt-18 md:pt-26 lg:pt-37 pb-26 md:pb-36"
      data-testid="product-container"
    >
      <ImageGallery className="md:hidden" images={images} />
      <Layout>
        <LayoutColumn className="mb-26 md:mb-52">
          <div className="flex max-lg:flex-col gap-8 xl:gap-27">
            {hasImages && (
              <div className="lg:w-1/2 flex flex-1 flex-col gap-8">
                <ImageGallery className="max-md:hidden" images={images} />
              </div>
            )}
            <div className="sticky flex-1 top-0">
              <ProductInfo product={product} />
              <ProductActions
                product={product}
                materials={materials}
                region={region}
              />
            </div>
            {!hasImages && <div className="flex-1" />}
          </div>
        </LayoutColumn>
      </Layout>


      {(
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          {!isStarterKit ? <Layout>
            <LayoutColumn className="mb-16 md:mb-26">
              <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="relative w-full" style={{ maxWidth: 639 }}>
                  <Image
                    src="/images/content/Rectangle 553.png"
                    alt={product.title || "Product image"}
                    width={639}
                    height={639}
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center gap-10 md:gap-14">
                  <div>
                    <h3 className="text-base md:text-md font-helvetica font-medium mb-3 ">
                      SCENT, MADE INTIMATE
                    </h3>
                    <p className="text-sm md:text-base font-helvetica text-black leading-relaxed">
                      This modern solid perfume melts seamlessly into skin, releasing fragrance slowly and deliberately. It wears close. Just scent where you want it, when you want it.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base md:text-md font-helvetica font-medium mb-3 ">
                      FRAGRANCE REFINED
                    </h3>
                    <p className="text-sm md:text-base font-helvetica text-black leading-relaxed">
                      Developed in collaboration with world-class perfumer Jérôme Epinette. Our signature SIDIA fragrance is reimagined in a concentrated solid format for a richer, longer-wearing experience that unfolds throughout the day.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base md:text-md font-helvetica font-medium mb-3 ">
                      DESIGNED FOR TOUCH
                    </h3>
                    <p className="text-sm md:text-base font-helvetica text-black leading-relaxed">
                      Housed in a sleek, travel-ready compact, the solid perfume is made for effortless application, dabbed onto pulse points, layered intuitively, and reapplied as a quiet ritual.
                    </p>
                  </div>
                </div>
              </div>
            </LayoutColumn>
          </Layout> : <FragranceSection />}
        </Suspense>
      )}

      <Suspense fallback={<SkeletonRelatedProducts />}>
        <RelatedProducts product={product} countryCode={countryCode} />
      </Suspense>
    </div>
  )
}

export default ProductTemplate
