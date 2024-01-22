import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = (props: ButtonProps) => {
    return (
        <button type='button' className={`shadow py-1 px-3 rounded-xl bg-white hover:bg-slate-100 w-fit
        text-slate-700 border-2 border-slate-300 font-medium ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;