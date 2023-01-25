This project is a script that uses the Shopify Node.js API client to clone collections and pages from one Shopify store to another. The script authenticates with the original store using a shop name and access token, and then authenticates with the target store using a shop name and access token.

The script is easy to use, you only need to provide the shopName (without .myshopify) and accessToken, then run the script and it will clone the collections and pages from the original store to the target store.

To access token for your Shopify store, you will need to create a private app in your Shopify store's admin panel.

Here are the steps to create a private app in Shopify:

1. Log in to your Shopify store's admin panel.
2. Click on the "Apps" button in the left sidebar.
3. In the top right corner of the page, click on the "Manage private apps" button.
4. Click on the "Create new private app" button.
5. Fill in the required fields, including a name for the app, an emergency developer email address, and the permissions you want the app to have.
6. Click on the "Save" button. Once the private app is created, you will be able to see the API key (access token) and the shop name in the app details.

Please note that the private app should have the necessary permissions, such as "read and write access" to the pages, products or collections resources.

To run the Script : node migrate.js
