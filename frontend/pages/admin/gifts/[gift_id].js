import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import GiftIcon from "@iconscout/react-unicons/icons/uil-gift";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { fetchIt } from "../../../utils";
import AdminPage from "../../../components/AdminPage";
import PropTypes from "prop-types";
import { itemType } from "../../../types";
import Link from "../../../components/Link";

const AdminEditItem = ({ item }) => {
  const router = useRouter();
  console.log("router", router);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
      link: item.link,
      price: item.price,
      image: item.image,
    },
  });
  const onSubmit = async formData => {
    await fetchIt(`/item/${item._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
  };
  return (
    <AdminPage>
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

AdminEditItem.getInitialProps = async ({ query }) => {
  const item = await fetchIt(`/item/${query.id}`, { method: "GET" });
  return { item };
};

AdminEditItem.propTypes = {
  item: PropTypes.shape(itemType),
};

export default AdminEditItem;
