import React from "react"
import { twMerge } from "tailwind-merge"

interface Fragrance {
  id: string
  name: string
  gender: string
  top_notes: string
  heart_notes: string
  base_notes: string
  background_color: string
}

interface FragranceCardProps {
  fragrance: Fragrance
}

export const FragranceCard: React.FC<FragranceCardProps> = ({ fragrance }) => {
  return (
    <div
      className={twMerge(
        "p-4 flex flex-col justify-between h-full rounded-[16px] transition-transform hover:scale-[1.02]",
        ""
      )}
      style={{ backgroundColor: fragrance.background_color }}
    >
      <div>
        <div className="flex justify-between items-start mb-5">
          <h3 className="text-base md:text-md  font-helvetica text-black">{fragrance.name}</h3>
          <span className="text-[11px]  font-medium border border-[#252525] px-3 py-0.5 rounded-xs text-[#252525]">
            {fragrance.gender}
          </span>
        </div>

        <div className="space-y-1 text-[14px] text-black/80 font-light pr-4">
          <p>Top: {fragrance.top_notes}</p>
          <p>Heart: {fragrance.heart_notes}</p>
          <p>Base: {fragrance.base_notes}</p>
        </div>
      </div>

      <button className="mt-8 text-[13px] md:text-sm font-medium underline underline-offset-4 text-black hover:text-black/70 decoration-[1.5px] self-start">
        Discover More
      </button>
    </div>
  )
}
