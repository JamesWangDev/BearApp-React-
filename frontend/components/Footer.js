import React from "react";
import Link from "next/link";
import GithubIcon from "@iconscout/react-unicons/icons/uil-github";
import DocumentIcon from "@iconscout/react-unicons/icons/uil-document";
import { GiftSVG } from "./LandingPage/svgs";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-200">
      <div className="max-w-screen-md mx-auto p-8">
        <Link href="/">
          <a>
            <GiftSVG />
          </a>
        </Link>
        <div className="flex justify-between items-center w-32 mx-auto mb-6">
          <a href="https://chingu.io" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/chingu.png"
              alt="Chingu logo"
              className="h-8 w-8"
            />
          </a>
          <a
            href="https://github.com/chingu-voyages/v16-bears-team-04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size="32" />
          </a>
          <Link href="docs/api">
            <a>
              <DocumentIcon size="32" />
            </a>
          </Link>
        </div>

        <p className="text-sm text-center">Made with ❤️ and ☕ by five 🧸</p>
      </div>
    </footer>
  );
}
