import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "use-auth0-hooks";
import { REDIRECTURI } from "../utils";

export default function Home() {
  const { pathname, query, replace } = useRouter();
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      replace("/admin");
    }
  }, [isAuthenticated]);
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
                  <Link href="/profile">
                    <a>Profile</a>
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

      <div className="hero">
        <video id="background-video" muted loop autoPlay>
          <source src="./videos/backgroundvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h1 className="title">A gift registry for every occasion.</h1>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");
        @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

        body {
          font-size: 16px;
          line-heigt: 1.5;
          color: #47353a;
          font-family: Roboto;
        }

        header {
          padding: 10px 15px;
          background-color: white;
          overflow: hidden;
          font-family: Roboto;
        }

        #background-video {
          min-width: 100%;
          min-height: 100%;
          position: fixed;
          z-index: -1;
          right: 0;
          bottom: 0;
        }

        header h1 {
          float: left;
        }

        header nav {
          float: right;
        }

        header nav a {
          color: #47353a;
          text-decoration: none;
          margin-left: 12px;
          text-transform: uppercase;
          font-weight: 700;
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          line-height: 1.15;
          font-size: 48px;
          font-family: Roboto, sans-serif;
          color: white;

          left: 0;
          line-height: 200px;
          margin-top: -100px;
          position: absolute;
          text-align: center;
          top: 50%;
          width: 100%;
        }

        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }

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

        #myVideo {
          position: fixed;
          right: 0;
          bottom: 0;
          min-width: 100%;
          min-height: 100%;
        }
      `}</style>
    </div>
  );
}
