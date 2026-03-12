const Medusa = require('@medusajs/js-sdk').default;

async function test() {
    const publishableKey = "pk_8ff9998f6ea415d7737cf585235df43f6a3c4be790e1f25b5784f7b95d6c80ec";
    const baseUrl = "http://localhost:9000";
    const variantId = "variant_01KGX8YB8705VS5RWRE2ERY9D6";

    const sdk = new Medusa({
        baseUrl: baseUrl,
        debug: true,
        publishableKey: publishableKey,
    });

    try {
        // 1. Create Cart
        console.log("Creating cart with SDK...");
        const cartResp = await sdk.store.cart.create();
        const cartId = cartResp.cart.id;
        console.log(`Cart created: ${cartId}`);

        // 2. Add Item
        console.log("Adding item to cart with SDK...");
        const addResp = await sdk.store.cart.createLineItem(cartId, {
            variant_id: variantId,
            quantity: 1
        });
        console.log("Item added successfully with SDK!");
        console.log(JSON.stringify(addResp.cart, null, 2));

    } catch (error) {
        console.error("Error during SDK API test:");
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        try {
            console.error("Full Error:", JSON.stringify(error, null, 2));
        } catch (e) {
            console.error("Could not stringify error");
        }
    }
}

test();
