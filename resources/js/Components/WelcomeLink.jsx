import { Link } from "@inertiajs/react";
import React from "react";

function WelcomeLink({ href, children }) {
    return (
        <Link
            href={href}
            className="p-2 font-bold rounded-lg text-lg text-black hover:text-gray-600 duration-150"
        >
            {children}
        </Link>
    );
}

export default WelcomeLink;
