import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { adminFetchIt } from "../utils";
import { useAuth, withLoginRequired, withAuth } from "use-auth0-hooks";
import { AUTH0_API_IDENTIFIER } from "../utils";

const Welcome = () => {
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

  return <div>Loading...</div>;
};

export default withLoginRequired(withAuth(Welcome));
