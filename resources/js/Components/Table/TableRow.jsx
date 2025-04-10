import React from 'react'

export default function TableRow({children,isLast=false,key}) {
  return (
    <tr key={key} className={`${isLast? "" : 'border-b-2 border-gray-300'}`}>
        {children}
    </tr>
  )
}
