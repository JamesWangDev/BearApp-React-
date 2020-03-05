import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { withAuth, withLoginRequired } from "use-auth0-hooks";
import RegistryIcon from "@iconscout/react-unicons/icons/uil-diary";
import AdminPage from "../components/AdminPage";
import InputText from "../components/InputText";
import Button from "../components/Button";
import { fetchIt } from "../utils";
import { authType } from "../types";

const Admin = ({ auth }) => {
  console.log("auth: ", auth);
  const { register, handleSubmit, errors, reset, formState } = useForm();
  const { data } = useSWR("/registry/RoseAndMel");

  useEffect(() => {
    if (!formState.dirty) {
      reset(data);
    }
  }, [data]);

  const onSubmit = formData => {
    mutate("/registry/RoseAndMel", async () => {
      const registry = await fetchIt(`/registry/${data._id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          ...formData,
        }),
      });
      return registry;
    });
  };

  return (
    <AdminPage>
      <header className="header flex py-10 px-5 text-size text-xl">
        <div className="header__icon">
          <RegistryIcon color="#fff" size={30} />
        </div>
        <div className="pl-5">
          <h1>Registry details</h1>
        </div>
      </header>
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            id="title"
            error={errors.title}
            ref={register({ required: "Title is required" })}
          >
            Title
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
            id="p1FullName"
            error={errors.p1FullName}
            ref={register({ required: "Partner 1 name is required" })}
          >
            Partner 1 full name
          </InputText>
          <InputText
            id="p2FullName"
            error={errors.p2FullName}
            ref={register({ required: "Partner 2 name is required" })}
          >
            Partner 2 full name
          </InputText>
          <InputText
            id="email"
            error={errors.email}
            ref={register({ required: "Email is required" })}
          >
            Email
          </InputText>
          <InputText id="phoneNumber" error={errors.phone} ref={register}>
            Phone number
          </InputText>
          <InputText
            id="tyMessage"
            type="text"
            error={errors.tyMessage}
            ref={register}
          >
            Thank you message
          </InputText>
          <InputText
            id="customUrl"
            error={errors.customUrl}
            ref={register({ required: "Custom URL is required" })}
          >
            Custom URL
          </InputText>
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <style jsx>{`
        .header .header__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 49px;
          height: 49px;
          border-radius: 8px;
          background-image: linear-gradient(180deg, #6fe3ff 0%, #2fc7f5 100%);
        }

        .header h1 {
          line-height: 49px;
        }
      `}</style>
    </AdminPage>
  );
};

// weddingDate : {
//     type: Date,
// },
// userId: {
//     type: String,
//     required: [true, "UserId is required"],
// },
// coverImage: {
//     type: String,
//     default: "https://bit.ly/2Pr0xeQ"
// }

Admin.propTypes = {
  auth: authType,
};

export default withLoginRequired(withAuth(Admin));
