"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { Icon } from "./Icon"

interface AccordionProps {
  title: string
  children: React.ReactNode
  className?: string
  defaultExpanded?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  className,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className={twMerge("border-b border-grayscale-200 py-4", className)}>
      <Button
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-base font-medium text-black">{title}</span>
        <Icon
          name="chevron-down"
          className={twMerge(
            "h-5 w-5 transition-transform duration-200",
            isExpanded ? "rotate-180" : ""
          )}
        />
      </Button>
      <div
        className={twMerge(
          "grid transition-all duration-200 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden text-sm text-grayscale-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
