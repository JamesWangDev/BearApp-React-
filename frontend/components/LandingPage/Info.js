import React from "react";
import { GiftCardSVG, GiftBoxSVG, GiftSendSVG } from "./svgs";

const data = [
  {
    svg: <GiftCardSVG />,
    heading: "Customizable",
    subheading: "Layout. Gifts. Edit Anything.",
    description: `We make it easy to update the look of your registry, so you feel into control.`,
  },
  {
    svg: <GiftBoxSVG />,
    heading: "User Friendly",
    subheading: "Simply beautiful",
    description: `We use our industry best practice to protect you and keep your focus on your special day.`,
  },
  {
    svg: <GiftSendSVG />,
    heading: "Ease of Use",
    subheading: "Industry best practices",
    description: `We make it easy for your friends and family to contribute to the things that yout actually want.`,
  },
];

export default function Info() {
  return (
    <div className="bg-gray-100">
      <div>
        <div className="max-w-screen-lg mx-auto text-center px-4 my-8 md:my-10">
          <h1 className="text-3xl md:text-5xl text-gray-900 mb-1">
            What you&apos;ll love about Chingu Registry
          </h1>
          <p className="text-xl md:text-3xl text-gray-800 mb-1">
            It&apos;s free and easy to use
          </p>
          <hr className="bg-gray-300 w-16 mx-auto my-4" />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 md:px-10 pb-8">
        {data.map(({ svg, heading, subheading, description }, i) => (
          <div
            key={heading}
            className={`max-w-screen-md mx-auto mb-8 flex flex-col md:${
              i % 2 ? "flex-row-reverse" : "flex-row"
            } justify-center items-center`}
          >
            {svg}
            <div
              className={`max-w-lg flex flex-col text-center md:${
                i % 2 ? "mr-3" : "ml-3"
              } md:p-4`}
            >
              <h1 className="text-4xl text-gray-900">{heading}</h1>
              <h4 className="text-xl font-semibold text-purple-900 mt-1 mb-2">
                {subheading}
              </h4>
              <p className="text-gray-800">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
