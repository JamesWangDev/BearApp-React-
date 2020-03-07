import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// import { withAuth, withLoginRequired } from "use-auth0-hooks";
import useSWR, { mutate } from "swr";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { fetchIt } from "../../../utils";
import AdminPage from "../../../components/AdminPage";
import { authType, fakeAuthObj } from "../../../types";
import Link from "../../../components/Link";

const AdminEditItem = ({ auth }) => {
  const router = useRouter();
  const { register, handleSubmit, errors, reset, formState } = useForm();
  const { data } = useSWR(`/item/${router.query.gift_id}`);

  useEffect(() => {
    if (!formState.dirty) {
      reset(data);
    }
  }, [data]);

  const onSubmit = formData => {
    mutate("/items", async items => {
      const newItem = await fetchIt(`/item/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      console.log(newItem, items);
      return items && items.length > 0
        ? items.map(item => {
            if (item._id === newItem._id) {
              return newItem;
            }
            return item;
          })
        : [newItem];
    });
    reset();
    router.push("/admin/gifts");
  };

  return (
    <AdminPage user={auth.user}>
      <AdminPage.Header icon={<GiftIcon />} title="Edit Item" />
      <AdminPage.Main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            id="name"
            error={errors.name}
            ref={register({ required: "Name is required" })}
          >
            Name
          </InputText>
          <InputText
            id="description"
            error={errors.description}
            type="textarea"
            ref={register}
          >
            Description
          </InputText>
          <InputText
            id="price"
            type="number"
            error={errors.price}
            ref={register({ required: "Price is required" })}
          >
            Price
          </InputText>
          <InputText
            id="link"
            error={errors.link}
            ref={register({ required: "Link is required" })}
          >
            Link
          </InputText>
          <InputText id="image" error={errors.image} ref={register}>
            Image
          </InputText>
          <Button type="submit">Save</Button> {` `}
          <Link href="/admin/gifts">Back</Link>
        </form>
      </AdminPage.Main>
    </AdminPage>
  );
};

// AdminEditItem.getInitialProps = async ({ query }) => {
//   const item = await fetchIt(`/item/${query.id}`, { method: "GET" });
//   return { item };
// };

AdminEditItem.propTypes = {
  auth: authType,
};

AdminEditItem.defaultProps = {
  auth: fakeAuthObj,
};

// export default withLoginRequired(withAuth(AdminEditItem));
export default AdminEditItem;
