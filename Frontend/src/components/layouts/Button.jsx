import React from 'react'

export default function Button({ text, type = "button", className = "", varient = "default", onClick, icon, width="fit" }) {

    const baseStyles = ` flex items-center max-sm:gap-1  gap-2 justify-center text-[20px] w-${width} py-2  px-6 max-sm:px-3 rounded-[2px] cursor-pointer border transition-all duration-300 `;
    const varientStyles = {
        default: " bg-[rgb(219,68,68)] text-white border-none",
        blacked: "bg-black text-white border-white  ",
        outlined: "bg-transparent text-black border-black  "
    };

    return (
        <button type={type} onClick={onClick} className={`${baseStyles}  ${varientStyles[varient]} ${className}  `}  >{text} {icon} </button>
    )
}
