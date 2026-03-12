const { sdk } = require("./src/lib/config");

async function testFetch() {
  try {
    const data = await sdk.client.fetch("/store/fragrances", {
      method: "GET",
      cache: "no-store",
    });
    console.log("SUCCESS:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("ERROR:", err.message, err);
  }
}

testFetch();
