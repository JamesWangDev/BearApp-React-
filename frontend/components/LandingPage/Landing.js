import React from "react";
import NavBar from "../../components/NavBar";
import Hero from "./Hero";

// import Gift from "../../public/svgs/gift.svg";
// import GiftBox from "../../public/svgs/giftbox.svg";
// import GiftCard from "../../public/svgs/giftcard.svg";
// import GiftSend from "../../public/svgs/giftsend.svg";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="bg-gray-100 text-gray-900">
        <Hero />

        {/* <Gift className="w-64 h-64" />
        <GiftBox className="w-64 h-64" />
        <GiftCard className="w-64 h-64" />
        <GiftSend className="w-64 h-64" /> */}
      </div>

      <style jsx>{``}</style>
    </div>
  );
}
