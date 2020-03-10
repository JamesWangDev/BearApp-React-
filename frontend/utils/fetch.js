// using this fetch, so fetchIt can work client or server side
import fetch from "isomorphic-fetch";

const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://v16-bears-04-wedding-registry.herokuapp.com/api"
    : "http://localhost:5000/api";

const makeOptions = ({ method = "GET", body, headers = {} }) => ({
  method,
  body,
  headers: { "Content-Type": "application/json", ...headers },
});

// since our API responses will be in JSON, we can create a ...
// ... fetch wrapper to avoid re-writing the same logic
// MUST start route with '/' which equals '/api/'
const fetchIt = async (route, givenOptions = {}) => {
  // create the fetch url
  const url = backendURL + route;
  // create fetch options
  const options = makeOptions(givenOptions);
  // typical fetch
  const resp = await fetch(url, options);
  // parse the response
  const data = await resp.json();
  // if there's was an error, throw it - { message: 'Error message here' }
  if (!resp.ok) throw data;
  // otherwise return the results
  return data;
};

const adminFetchIt = async (route, accessToken) => {
  return await fetchIt(route, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export { fetchIt, adminFetchIt };
