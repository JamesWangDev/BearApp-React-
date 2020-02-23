import React from "react";
import PropTypes from "prop-types";

import { withAuth, withLoginRequired } from "use-auth0-hooks";

function Profile({ auth }) {
  const { user } = auth;
  return (
    <div>
      <h1>Profile</h1>
      <p>This is the profile page.</p>
      <pre>{JSON.stringify(user || {}, null, 2)}</pre>
    </div>
  );
}

Profile.propTypes = {
  auth: PropTypes.any,
  user: PropTypes.any,
};

export default withLoginRequired(withAuth(Profile));
