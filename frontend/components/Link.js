import React from "react";
import Link from "next/link";
import { string, bool } from "prop-types";

import { styles } from "./Button";

const StyledLink = props => (
  <Link {...props}>
    <a className={styles}>{props.children}</a>
  </Link>
);

StyledLink.propTypes = {
  href: string.isRequired,
  as: string,
  passHref: bool,
  prefetch: bool,
  replace: bool,
  scroll: bool,
  children: string.isRequired,
};

export default StyledLink;
