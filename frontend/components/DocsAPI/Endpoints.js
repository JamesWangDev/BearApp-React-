import React from "react";
import PropTypes from "prop-types";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import TextContainer from "./TextContainer";
import { getMethodColor } from "./utils";

const Endpoints = ({ endpoints }) =>
  endpoints.map(
    ({ method, url, description, body, protectedAs, responses }, i) => {
      const color = getMethodColor(method);
      return (
        <div
          key={method + i}
          className="mx-2 mt-5 bg-gray-200 rounded-lg shadow p-4"
        >
          <div className="flex mb-2">
            <span className={`${color} font-bold mr-1`}>{method} -</span>
            <span className={`${color} font-semibold italic`}>{url}</span>
          </div>

          <TextContainer title="Description:">
            <p className="ml-2">{description}</p>
          </TextContainer>

          <TextContainer title="Authentication:">
            <p className="ml-2">Route is protected for: {protectedAs}</p>
          </TextContainer>

          <TextContainer title="Returns:">
            <p className="ml-2 text-green-800">Success: {responses.success}</p>
            <p className="ml-2 text-red-800"> Failed: {responses.fail}</p>
          </TextContainer>

          <TextContainer title="Body:">
            <SyntaxHighlighter
              customStyle={{
                fontSize: "12px",
                width: "310px",
                backgroundColor: "#f7fafc",
                marginLeft: "8px",
              }}
              language="javascript"
            >
              {body}
            </SyntaxHighlighter>
          </TextContainer>
        </div>
      );
    }
  );

Endpoints.propTypes = {
  endpoints: PropTypes.array,
};

export default Endpoints;
