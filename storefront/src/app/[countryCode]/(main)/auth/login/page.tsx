import { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

import { getCustomer } from "@lib/data/customer"
import { LoginForm } from "@modules/auth/components/LoginForm"
import { LocalizedLink } from "@/components/LocalizedLink"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await getCustomer().catch(() => null)

  if (customer) {
    redirect(`/${countryCode}/account`)
  }

  return (
    <div className="flex min-h-screen">
      <Image
        src="/images/content/login-image.jpg"
        width={1440}
        height={500}
        alt="Gray backrest sofa and wooden coffee table"
          style={{ height: "750px" }}
        className="max-lg:hidden lg:w-1/2 shrink-0 object-cover"
      />
      <div className="shrink-0 max-w-120 lg:max-w-120 w-full mx-auto pt-30 lg:pt-37 pb-16 max-sm:px-4">
        <h1 className="text-xl md:text-2xl mb-10 md:mb-16">
          Welcome back to Nouvel Palm!
        </h1>
        <LoginForm
          className="mb-10 md:mb-15"
          redirectUrl={`/${countryCode}/account`}
        />
        <p className="text-grayscale-500">
          Don&apos;t have an account yet? You can{" "}
          <LocalizedLink
            href="/auth/register"
            variant="underline"
            className="text-black md:pb-0.5"
          >
            register here
          </LocalizedLink>
          .
        </p>
      </div>
    </div>
  )
}
