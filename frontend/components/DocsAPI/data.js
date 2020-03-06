export const baseGHURL = `https://github.com/chingu-voyages/v16-bears-team-04/blob/master/backend/`;

// body objects are extracted like this, so indentations ...
//  ... are accurate while highlighting the code
const createRegistryBody = `body = {
  title: String,
  description: String,
  p1FullName: String,
  p2FullName: String,
  email: String,
  customUrl: String, // no spaces
  items: [ String ],
  coverImage: String,
  userId: String,
  tyMessage: String, // optional
  weddingDate: Date.now(), // optional
  phoneNumber: Number, // optional
}`;

const updateRegistryBody = `body = {
  title: String, // optional
  description: String, // optional
  p1FullName: String, // optional
  p2FullName: String, // optional
  email: String, // optional
  customUrl: String, // optional 
  coverImage: String, // optional
  tyMessage: String, // optional
  weddingDate: Date.now(), // optional
  phoneNumber: Number, // optional
}`;

const madePurchaseBody = `body = {
  name: String, // optional
  email: String, // optional
  message: String, // optional
  pricePaid: Number,
}`;

const updateItemBody = `body = {
  name: String, // optional 
  description: String, // optional 
  price: Number, // optional
  link: String, // optional
  image: String, // optional 
  isReserved: String, // optional 
  reservedOn: Date.now(), // optional
}`;

const createItemBody = `body = {
  name: String,
  description: String,
  price: Number,
  link: String, // optional
  image: String, // optional
}`;

const deleteMultipleItemsBody = `body = {
  arrayOfIds: [ String ]
}`;

export const docs = {
  heading: "Developer Documentation",
  subheading: "Wedding Registry API Endpoint Guide",
  description: `Useful information to help developers understand and use our backend API`,
  author: { name: "Daniel Strong", link: "https://github.com/dastrong" },
  routes: [
    {
      header: "Registry",
      referenceURLs: {
        Model: "src/models/Registry/registry-model.ts",
        Routes: "src/routes/Registry/registry-routes.ts",
        Controllers: "src/routes/Registry/registry-controllers.ts",
        Examples: "src/models/Registry/registry-examples.ts",
        Typescript: "src/models/Registry/registry-types.ts",
      },
      endpoints: [
        {
          method: "GET",
          url: "api/registry",
          description: "Get all/every registry",
          body: "No body needed",
          protectedAs: "no one",
          responses: {
            success: `An array of registry objects with their items array populated`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "POST",
          url: "api/registry",
          description: "Create a single registry",
          body: createRegistryBody,
          protectedAs: "paid users",
          responses: {
            success: `An array of registry objects with their items array populated`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "GET",
          url: "api/registry/:customUrl",
          description: "Get a single registry by it's customUrl",
          body: "No body needed",
          protectedAs: "no one",
          responses: {
            success: `A registry object with its items array populated`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "PUT",
          url: "api/registry/:registryId",
          description: "Update a single registry",
          body: updateRegistryBody,
          protectedAs: "registry owners or admins",
          responses: {
            success: `An array of registry objects with their items array populated`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "DELETE",
          url: "api/registry/:registryId",
          description: "Delete a single registry and all it's items",
          body: "No body needed",
          protectedAs: "registry owners or admins",
          responses: {
            success: `{ message: 'Deleted registry and num/num items }`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
      ],
    },
    {
      header: "Items",
      referenceURLs: {
        Model: "src/models/Items/items-model.ts",
        Routes: "src/routes/Items/items-routes.ts",
        Controllers: "src/routes/Items/items-controllers.ts",
        Examples: "src/models/Items/items-examples.ts",
        Typescript: "src/models/Items/items-types.ts",
      },
      endpoints: [
        {
          method: "GET",
          url: "api/item/all",
          description: "Get all/every item",
          body: "No body needed",
          protectedAs: "no one",
          responses: {
            success: `An array of item objects`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "GET",
          url: "api/item/:itemId",
          description: "Get a single item by it's id",
          body: "No body needed",
          protectedAs: "no one",
          responses: {
            success: `An items object`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "POST",
          url: "api/item/:itemId",
          description: "Update item on purchase and save purchaser's info",
          body: madePurchaseBody,
          protectedAs: "no one",
          responses: {
            success: `An updated item object`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "PUT",
          url: "api/item/:itemId/registry/:registryId",
          description: "Update one item's details",
          body: updateItemBody,
          protectedAs: "registry owners or admins",
          responses: {
            success: `An updated item object`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "DELETE",
          url: "api/item/:itemId/registry/:registryId",
          description: `Delete one item and remove it from that registry items array`,
          body: "No body needed",
          protectedAs: "registry owners or admins",
          responses: {
            success: `The deleted item object`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "POST",
          url: "api/item/registry/:registryId",
          description: `Create one item and add it to it's registry items array`,
          body: createItemBody,
          protectedAs: "paid users",
          responses: {
            success: `The new item object`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
        {
          method: "DELETE",
          url: "api/item/registry/:registryId",
          description: `Delete multiple items and remove them from that registry items array`,
          body: deleteMultipleItemsBody,
          protectedAs: "registry owners or admins",
          responses: {
            success: `{ message: 'Updated registry items and deleted num/num items' }`,
            fail: "{ message: 'A detailed error message here' }",
          },
        },
      ],
    },
  ],
};
