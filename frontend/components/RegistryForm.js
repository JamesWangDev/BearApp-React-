import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import InputText from "./InputText";
import Button from "./Button";

const RegistryForm = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
  });
  return (
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
  );
};

RegistryForm.propTypes = {
  defaultValues: PropTypes.shape(),
  onSubmit: PropTypes.func,
};

RegistryForm.defaultProps = {
  defaultValues: {},
};

export default RegistryForm;
