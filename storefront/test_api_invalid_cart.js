const axios = require('axios');

async function test() {
    const publishableKey = "pk_8ff9998f6ea415d7737cf585235df43f6a3c4be790e1f25b5784f7b95d6c80ec";
    const baseUrl = "http://localhost:9000";
    const invalidCartId = "cart_invalid";

    try {
        console.log("Updating INVALID cart...");
        const updateResp = await axios.post(`${baseUrl}/store/carts/${invalidCartId}`, {
            promo_codes: []
        }, {
            headers: {
                'x-publishable-api-key': publishableKey,
                'Content-Type': 'application/json'
            }
        });
        console.log("Cart updated successfully (how???)");
    } catch (error) {
        console.error("Error during API test with invalid cart:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }
    }
}

test();
