import { Link } from "@inertiajs/react";
import React from "react";

function WelcomeLink({ href, children }) {
    return (
        <Link
            href={href}
            className="p-2 font-bold rounded-lg text-lg text-blue-800 hover:text-blue-900 duration-150"
        >
            {children}
        </Link>
    );
}

export default WelcomeLink;
