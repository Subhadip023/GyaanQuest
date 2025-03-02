import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

function Index() {
    return (
        <AdminLayout title="Role" heading="Roles">
            <section className="text-gray-600 body-font py-2">
               
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead className="border-b-2 border-gray-400">
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg     rounded-tl rounded-bl">
                                        Plan
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg    ">
                                        Speed
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg    ">
                                        Storage
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-lg    ">
                                        Price
                                    </th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm     rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className=" px-4 py-3">Start</td>
                                    <td className=" px-4 py-3">5 Mb/s</td>
                                    <td className=" px-4 py-3">15 GB</td>
                                    <td className=" px-4 py-3 text-lg text-gray-900">
                                        Free
                                    </td>
                                    <td className="w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        Pro
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        25 Mb/s
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        25 GB
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $24
                                    </td>
                                    <td className="border-t-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        Business
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        36 Mb/s
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        40 GB
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $50
                                    </td>
                                    <td className="border-t-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center"></td>
                                </tr>
                                <tr>
                                    <td className="border-t-2  px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2  px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2  px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2  px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2  w-10 text-center"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  
            </section>
        </AdminLayout>
    );
}

export default Index;
