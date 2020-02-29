import React from "react";
import { fetchIt } from "../utils";
import PropTypes from "prop-types";
import { registryType } from "../types";

function RegistryPage({ registry }) {
  return <div>{registry.title}</div>;
}

RegistryPage.getInitialProps = async ctx => {
  const registry = await fetchIt(`/registry/${ctx.query.registryUrl}`);
  return { registry };
};

RegistryPage.propTypes = {
  registry: PropTypes.shape(registryType),
};

export default RegistryPage;
