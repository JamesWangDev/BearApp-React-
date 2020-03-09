import React from "react";
import GiftWishesSVG from "./GiftWishesSVG";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-text text-gray-900">
        <h1 className="text-6xl font-medium">
          The <span className="text-green-700">perfect</span> wedding registry
        </h1>
        <p className="text-4xl mt-6 text-gray-800">
          We keep it simple for you and your guests
        </p>
      </div>

      <GiftWishesSVG />

      <style jsx>{`
        .hero {
          height: calc(100vh - 62px);
          background-color: #edf2f7;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%23eac3f1' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%23e794eb' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23e465e6' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23e136e0' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23de07da' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
          background-size: cover;
          transform: rotateY(180deg);
          /* background by SVGBackgrounds.com */
        }

        @media screen and (min-width: 769px) {
          .hero-text {
            transform: rotateY(180deg);
            position: absolute;
            top: 5vh;
            left: 30px;
            right: 30px;
            text-align: right;
          }

          .hero-text h1 {
            font-size: 4.5rem;
            line-height: 120%;
          }

          .hero-text p {
            width: calc(100vw - 30px - 30px - 35vw);
            font-size: 2.75rem;
            line-height: 150%;
            margin-left: auto;
          }
        }

        @media screen and (max-width: 768px) {
          .hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .hero-text {
            transform: rotateY(180deg);
            margin-bottom: 7vh;
            width: 95%;
            min-width: 310px;
            max-width: 700px;
            text-align: center;
          }

          .hero-text h1 {
            font-size: 3.5rem;
            line-height: 130%;
          }

          .hero-text p {
            font-size: 2rem;
            line-height: 125%;
          }
        }

        @media screen and (max-width: 375px) {
          .hero-text h1 {
            font-size: 3rem;
          }

          .hero-text p {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
