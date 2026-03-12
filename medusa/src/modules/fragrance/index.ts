import { Module } from "@medusajs/framework/utils"
import Service from "./service"

export const FRAGRANCE_MODULE = "fragrance"

export default Module(FRAGRANCE_MODULE, {
  service: Service,
})
