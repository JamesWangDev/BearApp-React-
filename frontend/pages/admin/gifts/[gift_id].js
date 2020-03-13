import React from "react";
import { useRouter } from "next/router";
import { withLoginRequired } from "use-auth0-hooks";
import useSWR from "swr";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import AdminPage from "../../../components/AdminPage";
import ItemForm from "../../../components/ItemForm";
import Loader from "../../../components/Loader";

export default withLoginRequired(function AdminEditItem() {
  const { query } = useRouter();
  const { data } = useSWR(`/item/${query.gift_id}`);

  return (
    <AdminPage>
      {() => (
        <>
          <AdminPage.Header icon={<GiftIcon />} title="Edit Item" />
          <AdminPage.Main>
            {!data ? (
              <Loader text="Grabbing your gift details" />
            ) : (
              <ItemForm defaultValues={data} />
            )}
          </AdminPage.Main>
        </>
      )}
    </AdminPage>
  );
});
