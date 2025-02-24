import React from "react";
import { Link } from "@inertiajs/react";
function SideBarLink({href='#',active=false,name="name",children}) {
    return (
        <li>
            <Link
                to={href}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
${active?'bg-gray-100 dark:bg-gray-700 ':''}`}            >
                {children}
            </Link>
        </li>
    );
}

export default SideBarLink;
