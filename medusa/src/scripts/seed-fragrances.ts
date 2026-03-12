export default async function seedFragrance({ container }) {
  console.log("Container keys:", Object.keys(container.registrations).filter(k => k.includes("fragrance") || k.includes("Fashion")))
  
  try {
    const fragranceModuleService = container.resolve("fragrance")
    console.log("Resolved fragrance service")

    // Clear existing fragrances first
    const existingFragrances = await fragranceModuleService.listFragrances()
    if (existingFragrances.length > 0) {
      await fragranceModuleService.deleteFragrances(existingFragrances.map(f => f.id))
      console.log(`Cleared ${existingFragrances.length} existing fragrances`)
    }

    await fragranceModuleService.createFragrances([
      {
        name: "Elise",
        gender: "Female",
        top_notes: "Grapefruit, Quince",
        heart_notes: "Jasmine, Hyacinth",
        base_notes: "White Musk, Iris, Amber",
        background_color: "#FCF2ED",
        order: 1,
      },
      {
        name: "Solenne",
        gender: "Female",
        top_notes: "Sicilian Mandarin",
        heart_notes: "Peony, Damask Rose, Apricot",
        base_notes: "White Musk",
        background_color: "#D8BDC5",
        order: 2,
      },
      {
        name: "Cassien",
        gender: "Unisex",
        top_notes: "Bergamot, Coriander, Cinnamon",
        heart_notes: "Immortelle, Rose, Jasmine",
        base_notes: "Myrrh, Benzoin, Leather, Moss",
        background_color: "#F4DDC4",
        order: 3,
      },
      {
        name: "Vallens",
        gender: "Male",
        top_notes: "Cardamom, Violet",
        heart_notes: "Iris, Ambrox",
        base_notes: "Sandalwood, Cedarwood, Leather",
        background_color: "#D2D7D1",
        order: 4,
      },
      {
        name: "Nocturna",
        gender: "Male",
        top_notes: "Sicilian Mandarin",
        heart_notes: "Peony, Damask Rose, Apricot",
        base_notes: "White Musk",
        background_color: "#C5C1BB",
        order: 5,
      },
      {
        name: "Veyron",
        gender: "Male",
        top_notes: "Grapefruit, Quince",
        heart_notes: "Jasmine, Hyacinth",
        base_notes: "White Musk, Iris, Amber",
      background_color: "#D9E9EE",
        order: 6,
      },
    ])

    console.log("Seed fragrances completed")
  } catch (error) {
    console.error("Error seeding fragrances:", error)
  }
}
