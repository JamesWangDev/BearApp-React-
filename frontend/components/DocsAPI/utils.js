export const getAllEndpoints = routes => {
  return routes.reduce((acc, cVal) => [...acc, ...cVal.endpoints], []);
};

export const filterEndpoints = (allEndpoints, searchInput) => {
  return allEndpoints.filter(
    ({ description, method, protectedAs, responses }) => {
      const wordsToSearch = `${description} ${method} ${protectedAs} ${responses.success}`
        .toLowerCase()
        .split(" ");
      const splitSearchInput = searchInput.toLowerCase().split(" ");
      return splitSearchInput.every(val =>
        wordsToSearch.some(desc => desc.includes(val))
      );
    }
  );
};

export const getMethodColor = method => {
  switch (method) {
    case "GET":
      return "text-green-700";
    case "POST":
      return "text-teal-700";
    case "PUT":
      return "text-purple-700";
    case "DELETE":
      return "text-yellow-700";
    default:
      return "text-black";
  }
};
