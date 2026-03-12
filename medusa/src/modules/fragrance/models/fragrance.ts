import { model } from "@medusajs/framework/utils"

const Fragrance = model.define("fragrance", {
  id: model.id().primaryKey(),
  name: model.text(),
  gender: model.text(), // Female, Male, Unisex
  top_notes: model.text(),
  heart_notes: model.text(),
  base_notes: model.text(),
  background_color: model.text(), // Hex code
  order: model.number().default(0),
})

export default Fragrance
