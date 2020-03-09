import React from "react";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />

      <div className="hero">
        <video id="background-video" muted loop autoPlay>
          <source src="./videos/backgroundvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h1 className="title">A gift registry for every occasion.</h1>
      </div>

      <style jsx>{`
        #background-video {
          min-width: 100%;
          min-height: 100%;
          position: fixed;
          z-index: -1;
          right: 0;
          bottom: 0;
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
