import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { itemType } from "../types";
import Items from "../components/Items";
import { fetchIt } from "../utils";
import { useAuth } from "use-auth0-hooks";
import { AUTH0_API_IDENTIFIER } from "../utils";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);

  //const router = useRouter();
  const { accessToken } = useAuth({ audience: AUTH0_API_IDENTIFIER });

  // if the user isn't logged in direct to homepage
  // useEffect(() => {
  //   if (!accessToken) {
  //     // reroute to login page
  //     router.push("/");
  //   }
  // }, [accessToken]);

  // loads items
  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await fetchIt("/item/all", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("ITEMS: ", items);
        console.log(accessToken);
        setItems(items);
        //setIsLoading(false);
      } catch (err) {
        //setIsLoading(false);
        console.log(err.message);
      }
    };

    getItems();
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  // if (!accessToken) return <div>Not Authorized</div>;

  return (
    <>
      {/* <EditItem /> */}
      <Items items={items} />
    </>
  );
};

// const ItemsPage = ({ items }) => {
//   if (items.message) {
//     return <div>{items.message}</div>;
//   }
//   return <Items items={items} />;
// };

// ItemsPage.getInitialProps = async () => {
//   try {
//     const items = await fetchIt("/item/all", {
//       method: "GET",
//       // headers: {
//       //   Authorization: `Bearer ${accessToken}`,
//       // },
//     });
//     return { items };
//   } catch (err) {
//     console.log(err.message);
//     return { error: err.message };
//   }
// };

ItemsPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemType)),
};

export { itemType };
export default ItemsPage;
