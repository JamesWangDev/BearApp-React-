import React from "react";
import PropTypes from "prop-types";

import { useAuth, withAuth, withLoginRequired } from "use-auth0-hooks";

function Profile({ auth }) {
  const { user } = auth;

  const { accessToken } = useAuth({
    audience: "http://localhost:5000/api",
    prompt,
  });

  console.log(accessToken);

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
