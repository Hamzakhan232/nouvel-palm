"use client"

import { isEqual } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import * as ReactAria from "react-aria-components"
import { getVariantItemsInStock } from "@lib/util/inventory"
import { Button } from "@/components/Button"
import { NumberField } from "@/components/NumberField"
import { Accordion } from "@/components/Accordion"
import {
  UiSelectButton,
  UiSelectIcon,
  UiSelectListBox,
  UiSelectListBoxItem,
  UiSelectValue,
} from "@/components/ui/Select"
import { useCountryCode } from "hooks/country-code"
import ProductPrice from "@modules/products/components/product-price"
import { UiRadioGroup } from "@/components/ui/Radio"
import { withReactQueryProvider } from "@lib/util/react-query"
import { useAddLineItem } from "hooks/cart"

type ProductActionsProps = {
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
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) {
      acc[varopt.option_id] = varopt.value
    }
    return acc
  }, {})
}

const priorityOptions = ["Material", "Color", "Size"]

const getInitialOptions = (product: ProductActionsProps["product"]) => {
  if (product.variants?.length === 1) {
    const variantOptions = optionsAsKeymap(product.variants[0].options)
    return variantOptions ?? {}
  }

  if (product.options) {
    const singleOptionValues = product.options
      .filter((option) => option.values)
      .filter((option) => option.values!.length === 1)
      .reduce(
        (acc, option) => {
          acc[option.id] = option.values![0].value
          return acc
        },
        {} as Record<string, string>
      )

    return singleOptionValues
  }

  return null
}

function ProductActions({ product, materials, disabled }: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    getInitialOptions(product) ?? {}
  )
  const [quantity, setQuantity] = useState(1)
  const countryCode = useCountryCode()

  const { mutateAsync, isPending } = useAddLineItem()

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    const initialOptions = getInitialOptions(product)
    if (initialOptions) {
      setOptions(initialOptions)
    }
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected variant is in stock
  const itemsInStock = selectedVariant
    ? getVariantItemsInStock(selectedVariant)
    : 0

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    await mutateAsync({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
  }

  const hasMultipleVariants = (product.variants?.length ?? 0) > 1
  const productOptions = (product.options || []).sort((a, b) => {
    let aPriority = priorityOptions.indexOf(a.title ?? "")
    let bPriority = priorityOptions.indexOf(b.title ?? "")

    if (aPriority === -1) {
      aPriority = priorityOptions.length
    }

    if (bPriority === -1) {
      bPriority = priorityOptions.length
    }

    return aPriority - bPriority
  })

  const materialOption =
    productOptions.find((o) =>
      o.values?.some((v) => materials.some((m) => m.name === v.value))
    ) || productOptions.find((o) => o.title === "Material")

  const colorOption =
    productOptions.find((o) =>
      o.values?.some((v) =>
        materials.some((m) => m.colors.some((c) => c.name === v.value))
      )
    ) ||
    productOptions.find(
      (o) =>
        o.title === "Color" ||
        o.title?.toLowerCase().includes("colour") ||
        o.title?.toLowerCase().includes("color")
    )
  const otherOptions =
    materialOption && colorOption
      ? productOptions.filter(
        (o) => o.id !== materialOption.id && o.id !== colorOption.id
      )
      : productOptions

  const selectedMaterial =
    materialOption && options[materialOption.id]
      ? materials.find((m) => m.name === options[materialOption.id])
      : undefined

  const showOtherOptions =
    !materialOption ||
    !colorOption ||
    (selectedMaterial &&
      (selectedMaterial.colors.length < 2 || options[colorOption.id]))

  return (
    <>
      <ProductPrice product={product} variant={selectedVariant} />
      <div className="max-md:text-xs mb-8 md:mb-16 max-w-120">
        <p>{product.description}</p>
      </div>
      {hasMultipleVariants && (
        <div className="flex flex-col gap-8 md:gap-6 mb-4 md:mb-26">
          {materialOption && colorOption && (
            <>
              {selectedMaterial && (
                <div>
                  <p className="mb-4 flex gap-4 items-baseline">
                    <span className="text-black">{colorOption.title}</span>
                    <span className="text-grayscale-500 text-sm">
                      {options[colorOption.id]}
                    </span>
                  </p>
                  <UiRadioGroup
                    value={options[colorOption.id] ?? null}
                    onChange={(value) => {
                      setOptionValue(colorOption.id, value)
                    }}
                    aria-label={colorOption.title}
                    className="flex gap-4"
                    isDisabled={!!disabled || isPending}
                  >
                    {selectedMaterial.colors.map((color) => (
                      <ReactAria.Radio
                        key={color.id}
                        value={color.name}
                        aria-label={color.name}
                        className="h-8 w-8 cursor-pointer relative transition-all data-[selected]:after:content-[''] data-[selected]:after:absolute data-[selected]:after:-bottom-3 data-[selected]:after:left-0 data-[selected]:after:w-full data-[selected]:after:h-[1px] data-[selected]:after:bg-black hover:opacity-80"
                        style={{ background: color.hex_code }}
                      />
                    ))}
                  </UiRadioGroup>
                </div>
              )}
              <div>
                <p className="mb-4 flex gap-4 items-baseline">
                  <span className="text-black">Solid Perfume Balm</span>
                  {options[materialOption.id] && (
                    <span className="text-grayscale-500 text-sm">
                      {options[materialOption.id]}
                    </span>
                  )}
                </p>
                <ReactAria.Select
                  selectedKey={options[materialOption.id] ?? null}
                  onSelectionChange={(value) => {
                    setOptions({ [materialOption.id]: `${value}` })
                  }}
                  placeholder="Select"
                  className="w-full md:w-60"
                  isDisabled={!!disabled || isPending}
                  aria-label={materialOption.title}
                >
                  <UiSelectButton className="!h-11 px-4 gap-2 max-md:text-base border-grayscale-200">
                    <UiSelectValue />
                    <UiSelectIcon className="h-5 w-5" />
                  </UiSelectButton>
                  <ReactAria.Popover className="w-[--trigger-width]">
                    <UiSelectListBox>
                      {materials.map((material) => (
                        <UiSelectListBoxItem
                          key={material.id}
                          id={material.name}
                        >
                          {material.name}
                        </UiSelectListBoxItem>
                      ))}
                    </UiSelectListBox>
                  </ReactAria.Popover>
                </ReactAria.Select>
              </div>
            </>
          )}
          {showOtherOptions &&
            otherOptions.map((option) => {
              return (
                <div key={option.id}>
                  <p className="mb-4 flex gap-4 items-baseline">
                    <span className="text-black">{option.title}</span>
                    {options[option.id] && (
                      <span className="text-grayscale-500 text-sm">
                        {options[option.id]}
                      </span>
                    )}
                  </p>
                  <ReactAria.Select
                    selectedKey={options[option.id] ?? null}
                    onSelectionChange={(value) => {
                      setOptionValue(option.id, `${value}`)
                    }}
                    placeholder={`Select`}
                    className="w-full md:w-60"
                    isDisabled={!!disabled || isPending}
                    aria-label={option.title}
                  >
                    <UiSelectButton className="!h-11 px-4 gap-2 max-md:text-base border-grayscale-200">
                      <UiSelectValue />
                      <UiSelectIcon className="h-5 w-5" />
                    </UiSelectButton>
                    <ReactAria.Popover className="w-[--trigger-width]">
                      <UiSelectListBox>
                        {(option.values ?? [])
                          .filter((value) => Boolean(value.value))
                          .map((value) => (
                            <UiSelectListBoxItem
                              key={value.id}
                              id={value.value}
                            >
                              {value.value}
                            </UiSelectListBoxItem>
                          ))}
                      </UiSelectListBox>
                    </ReactAria.Popover>
                  </ReactAria.Select>
                </div>
              )
            })}
        </div>
      )}
      <div className="flex gap-4 items-center">
        <NumberField
          isDisabled={
            !itemsInStock || !selectedVariant || !!disabled || isPending
          }
          value={quantity}
          onChange={setQuantity}
          minValue={1}
          maxValue={itemsInStock}
          className="w-32"
          aria-label="Quantity"
        />
        <Button
          onPress={handleAddToCart}
          isDisabled={!itemsInStock || !selectedVariant || !!disabled}
          isLoading={isPending}
          className="flex-1 bg-black text-white hover:bg-grayscale-900 h-12"
        >
          {!selectedVariant
            ? "Select variant"
            : !itemsInStock
              ? "Out of stock"
              : "Add to cart"}
        </Button>
      </div>

      <div className="mt-5">
        <Accordion title="Description">
          <p>{product.description}</p>
        </Accordion>
      </div>
    </>
  )
}

export default withReactQueryProvider(ProductActions)
