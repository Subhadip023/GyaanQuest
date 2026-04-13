import React from 'react'

export default function TableRow({children,isLast=false}) {
  return (
    <tr className={`${isLast? "" : 'border-b-2 border-gray-300'}`}>
        {children}
    </tr>
  )
}
