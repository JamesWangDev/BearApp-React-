import React from "react";
import NavBar from "../NavBar";
import Button from "../Button";
import Endpoints from "./Endpoints";
import { docs, baseGHURL } from "./data";
import { getAllEndpoints, filterEndpoints } from "./utils";

const allEndpoints = getAllEndpoints(docs.routes);

export default function DocsApi() {
  const [searchInput, setSearchInput] = React.useState("");

  const filteredEndpoints = filterEndpoints(allEndpoints, searchInput);

  return (
    <>
      <NavBar />
      <div className="p-6 pb-4 bg-gray-100 text-gray-900 min-h-screen">
        <div className="flex flex-col justify-center text-center text-black">
          <h1 className="text-5xl mb-2">{docs.heading}</h1>
          <h2 className="text-3xl mb-2 text-gray-800">{docs.subheading}</h2>
          <p className="text-sm leading-relaxed mb-2 text-gray-700">
            {docs.description}
          </p>
          <hr className="w-24 my-3 mx-auto border-gray-400" />
        </div>

        <input
          type="text"
          value={searchInput}
          placeholder="Search for specific endpoints"
          onChange={e => setSearchInput(e.target.value)}
          className="block my-2 mx-auto p-3 w-64 text-center bg-gray-200 rounded-lg shadow "
        />

        <div className="p-2 mx-auto max-w-screen-md">
          {searchInput ? (
            <>
              <h2 className="text-3xl mb-2 text-center text-gray-800">
                Search Results
              </h2>
              {!filteredEndpoints.length ? (
                <>
                  <p className="text-center">
                    Sorry, nothing matches that search.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setSearchInput("")}
                    additionalStyles="mx-auto mt-4 block"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <Endpoints endpoints={filteredEndpoints} />
              )}
            </>
          ) : (
            docs.routes.map(({ header, referenceURLs, endpoints }) => (
              <div key={header} className="p-2">
                <h3 className="text-3xl mb-2 underline">{header}</h3>
                <h4 className="text-xl mr-2 mt-4">Code References</h4>
                <span className="text-sm text-gray-800">
                  Prefer reading code? Use these links to view the code
                </span>

                <ul className="mx-2 mt-5 bg-gray-200 rounded-lg shadow p-2">
                  {Object.keys(referenceURLs).map(url => (
                    <li key={url} className="m-1">
                      <a
                        href={baseGHURL + referenceURLs[url]}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-blue-500"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="my-3">
                  <h4 className="text-xl mr-2 mt-4">Routes</h4>
                  <span className="text-sm text-gray-800">
                    View all the {header.toLowerCase()} routes below
                  </span>
                  <Endpoints endpoints={endpoints} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
