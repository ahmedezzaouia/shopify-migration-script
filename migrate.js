import Shopify from "shopify-api-node";
import clonePages from "./clonePages.js";
import cloneCollections from "./cloneCollections.js";

(async () => {
  const originalStore = await new Shopify({
    shopName: "shop name without .myshopify",
    accessToken: "shpat_***************************",
  });

  const targetStore = await new Shopify({
    shopName: "shop name without .myshopify",
    accessToken: "shpat_***************************",
  });
  const authErrorStore = await checkStoresAuthentication(originalStore, targetStore);
  if (authErrorStore) {
    console.log(
      `please check your ${authErrorStore.origin} store.
       it's seems that your accessToken or shopName is not correct,
       or you don't give the right permistions to your app`
    );
    return;
  }
  console.log(`----will start cloning from <<${originalStore.options.shopName}>> to <<${targetStore.options.shopName}>> store`);

  await clonePages(originalStore, targetStore);

  console.log("----------------------------------------------------------");
  console.log("please wait, will start cloning Collections in 15 seconds...");
  console.log("----------------------------------------------------------");
  await new Promise((resolve) => setTimeout(resolve, 15000));

  await cloneCollections(originalStore, targetStore);

  console.log("----------------------------------------------------------");
  console.log("Cloning is Done, Please Check you Target Store");
  console.log("----------------------------------------------------------");
})();

async function checkStoresAuthentication(originalStore, targetStore) {
  console.log("checking your stores before start...");
  try {
    await originalStore.shop.get();
    await targetStore.shop.get();
  } catch (error) {
    return error.options.url;
  }
}
