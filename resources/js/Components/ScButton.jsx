import React from 'react'

function ScButton({
    className = 'px-5 py-2 flex items-center gap-x-2 text-white rounded-lg',
    btnType = "primary",
    disabled = false,
    children,
    ...props

}) {

    const btnClass = {
        primary: `${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"} bg-blue-700 text-white duration-200`,
        secondary: `${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"} bg-gray-500 text-white duration-200`,
        success: `${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500"} bg-green-600 text-white duration-200`,
        danger: `${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500"} bg-red-600 text-white duration-200`,
        warning: `${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400"} bg-yellow-500 text-white duration-200`,
        outline: `${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"} border border-gray-500 text-gray-700 bg-transparent duration-200`,
    }[btnType] || "bg-blue-700 text-white";


    return (
        <button
            {...props}
            className={btnClass}
            disabled={disabled}
        >{children}</button>
    )
}

export default ScButton;