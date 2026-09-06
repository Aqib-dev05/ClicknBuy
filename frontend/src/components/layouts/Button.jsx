import React,{useState} from "react";

export default function Button({
    text,
    type = "button",
    className = "",
    varient = "default",
    onClick,
    icon,
    width = "fit",
    disabled = false,
    ...props
}) {

    const baseStyles = ` flex items-center max-sm:gap-1  gap-2 justify-center text-[20px] w-${width} py-2  px-6 max-sm:px-3 rounded-[2px] cursor-pointer border transition-all duration-300 `;
    const varientStyles = {
        default: " bg-[rgb(219,68,68)] text-white border-none",
        blacked: "bg-black text-white border-white  ",
        outlined: "bg-transparent text-black border-black  ",
    };
    
    const [isThrottled, setIsThrottled] = useState(false);

    const handleClick = (e, onClick) => {
        if (isThrottled || disabled) return;

        if (onClick) {
            onClick(e);
            setIsThrottled(true);
            setTimeout(() => {
                setIsThrottled(false);
            }, 2000);
        }
    };

    return (
        <button
            type={type}
            onClick={(e) => handleClick(e, onClick)}
            className={`${baseStyles}  ${varientStyles[varient]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
            disabled={disabled}
            {...props}
        >
            {text} {icon}{" "}
        </button>
    );
}
