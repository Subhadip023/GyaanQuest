import React, { useState } from "react";

function CollapsibleDiv({ children,svg,title='title',active=false}) {
  const [openCollapsibleDiv, setOpenCollapsibleDiv] = useState(active);
  
  return (
    <li className={`${active?'bg-gray-100 dark:bg-gray-700 rounded-lg':'hover:bg-gray-100 hover:dark:bg-gray-700 rounded-lg'}`}>
      <button
        type="button"
        className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group ${active?'bg-gray-100 dark:bg-gray-700':'hover:bg-gray-100 dark:hover:bg-gray-700'}  dark:text-white `}
        onClick={() => setOpenCollapsibleDiv(!openCollapsibleDiv)}
      >
        {svg}

        {/* Title */}
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {title}
        </span>

        <svg
          className={`w-3 h-3 transform transition-transform duration-200 ${
            openCollapsibleDiv ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <ul
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openCollapsibleDiv ? "max-h-40 h-fit opacity-100" : "max-h-0 opacity-0"
        } `}
      >
        {children}
      </ul>
    </li>
  );
}

export default CollapsibleDiv;
