import React from 'react'

function PaginationSelector({ selectNumber = 5, handleDisplayChange, total }) {

    return (
        <div className="w-fit p-1 flex items-center rounded-lg bg-blue-700 text-white gap-x-2 hover:bg-blue-500">Display
            <select value={selectNumber} onChange={handleDisplayChange} className="text-blue-600 w-fit" name="" id="">
                {total > 5 && <option value="5">5</option>}
                {total > 10 && <option value="10">10</option>}
                {total > 20 && <option value="20">20</option>}
                {total > 50 && <option value="50">50</option>}
                <option value={total}>All</option>
            </select>records per page </div>
    )
}

export default PaginationSelector

