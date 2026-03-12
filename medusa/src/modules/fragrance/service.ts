import { MedusaService } from "@medusajs/framework/utils"
import Fragrance from "./models/fragrance"

class FragranceModuleService extends MedusaService({
  fragrance: Fragrance,
}) {}

export default FragranceModuleService
