import React, { useState } from 'react'

function UserDetails() {
    const [showUserDetailsDiv,setShowUserDetailsDiv]=useState(false);
  return (
 <div  className="flex items-center md:order-2  space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button"  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={()=>setShowUserDetailsDiv((prev)=>!prev)}>
        <span  className="sr-only">Open user menu</span>
        <img  className="w-8 h-8 rounded-full" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="user photo"/>
      </button>
      <div  className={`z-50 absolute ${showUserDetailsDiv?"":'hidden'} border-2 top-11 right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`}>
        <div  className="px-4 py-3">
          <span  className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span  className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul  className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="#"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      
  </div>  )
}

export default UserDetails