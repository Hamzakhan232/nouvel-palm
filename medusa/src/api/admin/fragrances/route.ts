import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { FRAGRANCE_MODULE } from "../../../modules/fragrance"
import FragranceModuleService from "../../../modules/fragrance/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const fragranceModuleService: FragranceModuleService = req.scope.resolve(FRAGRANCE_MODULE)

  const [fragrances, count] = await fragranceModuleService.listAndCountFragrances(
    req.filterableFields,
    req.listConfig
  )

  res.status(200).json({
    fragrances,
    count,
  })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fragranceModuleService: FragranceModuleService = req.scope.resolve(FRAGRANCE_MODULE)

  const fragrance = await fragranceModuleService.createFragrances(req.body)

  res.status(200).json({
    fragrance,
  })
}
