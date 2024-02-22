import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = (props: ButtonProps) => {
    return (
        <button type='button' className={`h-fit shadow py-1 px-3 rounded-xl bg-white hover:bg-slate-100 w-fit
        border-[1px] border-slate-300  font-normal ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;