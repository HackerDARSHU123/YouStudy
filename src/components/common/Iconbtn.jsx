import React from 'react'

export const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type
}) => {
  return (
    <button disabled={disabled}
    className={`flex items-center ${
      outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
    } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
    onClick={onclick}
    type={type}
    >
        {
            children ? (
                <><span>
                {text} 
            </span>
            {children}</>
            
            ):(text)
        }
    </button>
  )
}
