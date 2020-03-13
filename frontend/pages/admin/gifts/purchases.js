import React from "react";
import { withLoginRequired } from "use-auth0-hooks";
import ReceiptIcon from "@iconscout/react-unicons/icons/uil-receipt";
import AdminPage from "../../../components/AdminPage";
import Loader from "../../../components/Loader";
import Purchases from "../../../components/Purchases";
import Link from "../../../components/Link";

const AdminPurchases = () => (
  <AdminPage>
    {registry => {
      const purchases =
        registry &&
        registry.items &&
        registry.items.filter(
          ({ purchasers }) => purchasers && purchasers.length
        );

      return (
        <>
          <AdminPage.Header
            icon={<ReceiptIcon />}
            title="Your gift purchase history"
          />

          <AdminPage.Main>
            {!registry ? (
              <Loader text="Checking your gifts purchase history..." />
            ) : !purchases.length ? (
              <Loader text="No purchases to view">
                <div className="flex justify-between mt-6 w-full max-w-xs">
                  <Link href="/admin/gifts">View Gifts</Link>
                  <Link href="/admin/gifts/create">Add More Gifts</Link>
                </div>
              </Loader>
            ) : (
              <Purchases items={purchases} />
            )}
          </AdminPage.Main>
        </>
      );
    }}
  </AdminPage>
);

export default withLoginRequired(AdminPurchases);
