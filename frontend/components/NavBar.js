import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";
import { REDIRECTURI } from "../utils";

const NavBar = () => {
  const { pathname, query } = useRouter();
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  return (
    <div>
      <div>
        <ul>
          <li>
            <a href=""></a>
          </li>

          {!isLoading &&
            (isAuthenticated ? (
              <>
                <li>
                  <Link href="/admin">
                    <a>Admin</a>
                  </Link>
                </li>
                <li className="rightAlignNavBar">
                  <button onClick={() => logout({ returnTo: { REDIRECTURI } })}>
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li className="rightAlignNavBar">
                <button
                  onClick={() =>
                    login({ appState: { returnTo: { pathname, query } } })
                  }
                >
                  Log in / Sign up
                </button>
              </li>
            ))}
        </ul>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");
        @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

        ul {
          list-style-type: none;
          margin: 0;
          padding: 0px;
          overflow: hidden;
          background-color: #000000;
          position: fixed;
          top: 0;
          width: 100%;
        }

        li {
          float: left;
        }

        li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          font-family: "Work Sans", sans-serif;
        }

        /* Change the link color to #111 (black) on hover */
        li a:hover {
          background-color: #111;
        }

        .rightAlignNavBar {
          float: right;
          color: white;
          padding: 1em;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
