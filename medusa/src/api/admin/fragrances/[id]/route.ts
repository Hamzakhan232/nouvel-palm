import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { FRAGRANCE_MODULE } from "../../../../modules/fragrance"
import FragranceModuleService from "../../../../modules/fragrance/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const fragranceModuleService: FragranceModuleService = req.scope.resolve(FRAGRANCE_MODULE)

  const fragrance = await fragranceModuleService.retrieveFragrance(req.params.id)

  res.status(200).json({
    fragrance,
  })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fragranceModuleService: FragranceModuleService = req.scope.resolve(FRAGRANCE_MODULE)

  const fragrance = await fragranceModuleService.updateFragrances({
    id: req.params.id,
    ...(req.body as any),
  })

  res.status(200).json({
    fragrance,
  })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const fragranceModuleService: FragranceModuleService = req.scope.resolve(FRAGRANCE_MODULE)

  await fragranceModuleService.deleteFragrances([req.params.id])

  res.status(200).json({
    id: req.params.id,
    object: "fragrance",
    deleted: true,
  })
}
