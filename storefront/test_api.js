const axios = require('axios');

async function test() {
    const publishableKey = "pk_8ff9998f6ea415d7737cf585235df43f6a3c4be790e1f25b5784f7b95d6c80ec";
    const baseUrl = "http://localhost:9000";
    const variantId = "variant_01KGX8YB8705VS5RWRE2ERY9D6";

    try {
        // 1. Create Cart
        console.log("Creating cart...");
        const cartResp = await axios.post(`${baseUrl}/store/carts`, {}, {
            headers: {
                'x-publishable-api-key': publishableKey,
                'Content-Type': 'application/json'
            }
        });
        const cartId = cartResp.data.cart.id;
        console.log(`Cart created: ${cartId}`);

        // 2. Add Item
        console.log("Adding item to cart...");
        const addResp = await axios.post(`${baseUrl}/store/carts/${cartId}/line-items`, {
            variant_id: variantId,
            quantity: 1
        }, {
            headers: {
                'x-publishable-api-key': publishableKey,
                'Content-Type': 'application/json'
            }
        });
        console.log("Item added successfully!");
        console.log(JSON.stringify(addResp.data, null, 2));

    } catch (error) {
        console.error("Error during API test:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }
    }
}

test();
