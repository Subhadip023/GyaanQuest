import React from 'react'
import { Link } from '@inertiajs/react'
function CollabsableLinks({ href = '#', active = false, name = "name" }) {
    return (
        <li>
            <Link href={href} className={`flex items-center p-2  rounded-lg text-base   ml-10 group ${active ? 'text-blue-700 dark:text-blue-500 ' : 'text-gray-900 dark:text-white hover:text-blue-700 hover:dark:text-blue-500 '}`}>
                {name}
            </Link>
        </li>)
}

export default CollabsableLinks