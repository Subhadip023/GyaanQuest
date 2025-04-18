import React from 'react';
import DeleteBtn from '@/Components/DeleteBtn';
import EditBtn from '@/Components/EditBtn';
function ActionBtns({editFunction=()=>{},deleteFuntion=()=>{},children}) {
    return (
        <div className='flex w-full items-center gap-x-2'>
            <EditBtn onClick={editFunction} />
            <DeleteBtn onClick={deleteFuntion} />
            {children}
        </div>)
}

export default ActionBtns