import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, withLoginRequired } from "use-auth0-hooks";
import Loader from "../components/Loader";
import { adminFetchIt, AUTH0_API_IDENTIFIER } from "../utils";

export default withLoginRequired(function Welcome() {
  const { push } = useRouter();
  const { accessToken } = useAuth({ audience: AUTH0_API_IDENTIFIER });

  useEffect(() => {
    const checkUsersRegistry = async () => {
      try {
        await adminFetchIt("/registry/admin", accessToken);

        // send user to their registry page
        push(`/admin`);
      } catch (err) {
        // send user to create a registry page
        push("/create");
      }
    };
    checkUsersRegistry();
  }, []);

  return <Loader size={70} text="Please wait. We're redirecting you." />;
});
