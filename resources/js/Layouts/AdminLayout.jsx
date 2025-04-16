import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import DarkModeBtn from "@/Components/DarkModeBtn";
import UserDetails from "@/Components/UserDetails";
import logo from "../../../public/images/image.png";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "@/Components/Loader";
import AdminSideBar from "@/Components/AdminSideBar";

function AdminLayout({
    title = "Admin",
    children,
    heading = "GyaanQuest",
    showHeading = true,
    showBgBox = true,
    serachBoxPlaceHolder = "Search...",
    searchFunction = (value) => { value && console.log(value) },
    loading = false,
}) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const successMessage = usePage().props.flash?.success;
    const errorMessage = usePage().props.flash?.error;
    const [searchValue, setSearchValue] = useState("");



    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage, {
                position: "top-right",
                autoClose: 5000,
            });
        }

        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }, [successMessage, errorMessage]);
    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);


    useEffect(() => {
        if (searchValue.trim() === "") {
            searchFunction(null)
        } else {
            searchFunction(searchValue)
        }
    }, [searchValue]);


    return (
        <>
            {loading && <Loader />}
            <Head title={title} />

            <nav className="bg-white border-gray-200 dark:bg-gray-800 border-b-2 py-1 min-h-fit h-18">
                <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex gap-x-5 items-center ml-5">
                        <Link
                            to="/admin"
                            className="flex items-center  space-x-3 rtl:space-x-reverse"
                        >
                            {/* <img
                                src={logo}
                                className="absolute hidden sm:flex top-0.5 left-0  w-32"
                                alt=""
                                style={{ marginTop: "-20.5px" }}
                            /> */}
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-blue-500 ">
                                GyaanQuest
                            </span>
                        </Link>

                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded="false"
                            onClick={() => setIsSideBarOpen((prev) => !prev)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* <button
                        type="button"
                     
                        className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                       
                                                >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button> */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            id="search-navbar"
                            className="block w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={serachBoxPlaceHolder}
                        />
                    </div>

                    <div className="flex gap-x-5">
                        <DarkModeBtn />
                        <UserDetails />
                    </div>
                </div>
            </nav>

            <AdminSideBar isSideBarOpen={isSideBarOpen} />
            <main
                className={`bg-slate-100 dark:bg-slate-700 dark:text-white overflow-y-auto scrollbar h-[88vh] p-5 ${isSideBarOpen ? "md:ml-64" : "ml-0"
                    }`}
            >
                {showHeading && <div
                    className=" text-blue-700 dark:text-blue-500
                 flex items-center font-bold text-4xl justify-start"
                >
                    <div className="flex items-center p-5">
                        
                          {/* <img src={logo} className="hidden sm:flex w-24" alt="" /> */}
                        
                        {heading}</div>

                </div>}
                <div className={`${showBgBox ? 'bg-white p-5 dark:bg-gray-800 dark:text-white shadow-lg min-h-24 h-fit' : ''}`}>
                    <ToastContainer position="top-right" autoClose={5000} />

                    {children}
                </div>
            </main>
        </>
    );
}

export default AdminLayout;
