import React, { useState } from "react";

function CollapsibleDiv({ children }) {
  const [openCollapsibleDiv, setOpenCollapsibleDiv] = useState(false);

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setOpenCollapsibleDiv(!openCollapsibleDiv)}
      >
        {/* Icon */}
        <svg
          className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 21"
        >
          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
        </svg>

        {/* Title */}
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          E-commerce
        </span>

        {/* Arrow Icon (Rotates) */}
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

      {/* Collapsible Content */}
      <ul
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openCollapsibleDiv ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </ul>
    </li>
  );
}

export default CollapsibleDiv;
