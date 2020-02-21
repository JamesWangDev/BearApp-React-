import React from "react";
import PropTypes from "prop-types";
import { formErrorType } from "../types";

const convertNameToId = string =>
  string.replace(/([A-Z])/g, "-$1").toLowerCase();

const WrappedComponent = React.forwardRef(function TextInput(
  { id, type, error, children },
  ref
) {
  const label = convertNameToId(id);
  return (
    <div
      className={`
      md:flex
      md:items-center
      mb-6
    `}
    >
      <div className="md:w-1/3">
        <label
          htmlFor={label}
          className={`
            block
            text-gray-500
            font-bold
            med:text-right
            mb-1
            md:mb-0
            pr-4
          `}
        >
          {children}
        </label>
      </div>
      <div>
        <input
          ref={ref}
          id={label}
          name={label}
          type={type}
          className={`
            gb-gray-200
            appearance-none
            border-2
            border-gray-200
            rounded
            w-full
            py-2
            px-2
            text-gray-700
            leading-tight
            focus:outline-none
            focus:gb-white
            focus:border-purple-500
          `}
        />
      </div>
      {error && <div>{error.message}</div>}
    </div>
  );
});

WrappedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  error: formErrorType,
};

WrappedComponent.defaultProps = {
  type: "text",
};

export default WrappedComponent;
