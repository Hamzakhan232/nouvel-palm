const axios = require('axios');

async function test() {
    const publishableKey = "pk_8ff9998f6ea415d7737cf585235df43f6a3c4be790e1f25b5784f7b95d6c80ec";
    const baseUrl = "http://localhost:9000";
    const cartId = "cart_01KHMDN7J3WS33G0PT6J1R2W3F";

    try {
        console.log("Updating cart with EMPTY promotions...");
        const updateResp = await axios.post(`${baseUrl}/store/carts/${cartId}`, {
            promo_codes: []
        }, {
            headers: {
                'x-publishable-api-key': publishableKey,
                'Content-Type': 'application/json'
            }
        });
        console.log("Cart updated successfully (empty promos)!");

        console.log("Updating cart with INVALID promotion code...");
        try {
            const updateResp2 = await axios.post(`${baseUrl}/store/carts/${cartId}`, {
                promo_codes: ["invalid_code"]
            }, {
                headers: {
                    'x-publishable-api-key': publishableKey,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Cart updated with invalid promo (backend handled it)!");
        } catch (e) {
            console.log("Cart update with invalid promo FAILED (expected?):");
            if (e.response) {
                console.log("Status:", e.response.status);
                console.log("Data:", JSON.stringify(e.response.data, null, 2));
            } else {
                console.log("Message:", e.message);
            }
        }

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
