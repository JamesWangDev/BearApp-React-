import React from "react";
import PropTypes from "prop-types";
import ErrorPage from "next/error";
import useSWR from "swr";
import Items from "../components/Items";
import { fetchIt } from "../utils";
import { registryType } from "../types";

export default function RegistryPage({ registry, error, customUrl }) {
  // this is the key we'll need to mutate when a purchase is made
  const key = `/registry/${customUrl}`;
  // pass in the server rendered registry instead of making...
  // ... an unnecessary client side call
  const { data } = useSWR(key, undefined, { initialData: registry });

  console.log(data);

  if (error) return <ErrorPage statusCode="404" title="Registry Not Found" />;

  return (
    <div style={{ backgroundImage: `url(${data.coverImage})` }}>
      <p>{data.title}</p>
      <Items items={data.items} />
    </div>
  );
}

RegistryPage.getInitialProps = async ctx => {
  const customUrl = ctx.query.registryUrl;
  try {
    const registry = await fetchIt(`/registry/${customUrl}`);
    return { registry, customUrl };
  } catch (error) {
    return { error, customUrl };
  }
};

RegistryPage.propTypes = {
  registry: PropTypes.shape(registryType),
  error: PropTypes.string,
  customUrl: PropTypes.string,
};
