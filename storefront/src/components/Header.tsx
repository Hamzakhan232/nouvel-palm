import * as React from "react"
import { listRegions } from "@lib/data/regions"
import { SearchField } from "@/components/SearchField"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedLink } from "@/components/LocalizedLink"
import { HeaderDrawer } from "@/components/HeaderDrawer"
import { RegionSwitcher } from "@/components/RegionSwitcher"
import { HeaderWrapper } from "@/components/HeaderWrapper"
import Image from "next/image"
import LogoImg from "../../public/np-logo.svg"

import dynamic from "next/dynamic"

const LoginLink = dynamic(
  () => import("@modules/header/components/LoginLink"),
  { loading: () => <></> }
)

const CartDrawer = dynamic(
  () => import("@/components/CartDrawer").then((mod) => mod.CartDrawer),
  { loading: () => <></> }
)

export const Header: React.FC = async () => {
  const regions = await listRegions()

  const countryOptions = regions
    .map((r) => {
      return (r.countries ?? []).map((c) => ({
        country: c.iso_2,
        region: r.id,
        label: c.display_name,
      }))
    })
    .flat()
    .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))

  return (
    <>
      <HeaderWrapper>
        <Layout>
          <LayoutColumn>
            <div className="flex justify-between items-center h-18 md:h-21">
              <h1 className="flex items-center">
                <LocalizedLink href="/" className="flex items-center">
                  <Image src={LogoImg} alt="Nouvel Palm Logo" width={133} height={18} unoptimized className="invert group-data-[light=true]:md:invert-0 group-data-[sticky=true]:md:invert" />
                </LocalizedLink>
              </h1>
              <div className="flex items-center gap-8 max-md:hidden">
                <LocalizedLink href="/">Home</LocalizedLink>
                <LocalizedLink href="/store">Shop</LocalizedLink>
                <LocalizedLink href="/about">About</LocalizedLink>
                <LocalizedLink href="/contact">Contact Us</LocalizedLink>
              </div>
              <div className="flex items-center gap-3 lg:gap-6 max-md:hidden">
                <RegionSwitcher
                  countryOptions={countryOptions}
                  className="w-16"
                  selectButtonClassName="h-auto !gap-0 !p-1 transition-none"
                  selectIconClassName="text-current"
                />
                <React.Suspense>
                  <SearchField countryOptions={countryOptions} />
                </React.Suspense>
                <LoginLink className="p-1 group-data-[light=true]:md:text-white group-data-[sticky=true]:md:text-black" />
                <CartDrawer />
              </div>
              <div className="flex items-center gap-4 md:hidden">
                <LoginLink className="p-1 group-data-[light=true]:md:text-white" />
                <CartDrawer />
                <React.Suspense>
                  <HeaderDrawer countryOptions={countryOptions} />
                </React.Suspense>
              </div>
            </div>
          </LayoutColumn>
        </Layout>
      </HeaderWrapper>
    </>
  )
}
