import React from 'react'

function Table({ children, columns = ['#', '#', '#', '#'],width='w-full'}) {
    return (
        <div className={width+" mx-auto overflow-auto"}>
            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead className="border-b-2 border-gray-500 dark:border-gray-100">
                    <tr>
                        {columns.map((thead) => (
                            <th className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50 text-lg">{thead}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>

    )
}

export default Table