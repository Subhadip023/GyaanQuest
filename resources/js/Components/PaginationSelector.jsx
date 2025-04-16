import React from 'react'

function PaginationSelector({selectNumbers,handleDisplayChange,total}) {
    return (
        <div className="w-fit p-1 flex items-center rounded-lg bg-blue-700 text-white gap-x-2">Display 
        <select value={selectNumbers} onChange={handleDisplayChange} className="text-blue-600 w-fit" name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value={total}>All</option>
        </select>records per page </div>
    )
}

export default PaginationSelector