# Wedding Registry Backend

**Express** API connected to **MongoDB** through **Mongoose**, written in **TypeScript**.

Contained over 40 **Jest** tests, testing things like the app, models and routes.

Uses **ESLint** and **Prettier** to help keep all code consistent.

**Setup:**

- install `npm i -g yarn`
- navigate to backend root and run `yarn`
- create a `.env` file like below
- run `yarn dev` to start the server
- open http://localhost:3000/api
- run `yarn test` to see the test coverage

```
DB_USER = dbUserHere
DB_PASSWORD = dbPasswordHere
DB_URL = dbHere *refer to notes below*

AUTH0_DOMAIN = Auth0DomainHere
AUTH0_CLIENT_ID = Auth0ClientIdHere
AUTH0_API_IDENTIFIER = Auth0APIRouteHere

PERMISSIONS_ADMIN = arrayOfAdminPermissionsHere
PERMISSIONS_PAIDUSER = arrayOfPaidUserPermissionsHere

```

**Notes:**

- make sure you have prettier and eslint extensions installed on your IDE
- don't specify the database name, because the app will create production and development collections for you automatically
  - ex) mongodb.com DB urls usually have `/test` at the end. You'll just want the `/`
