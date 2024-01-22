import React from 'react'
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode,
    className?: string
}

const Button = (props: ButtonProps) => {
    const navigate = useNavigate();

    return (
        <button className={`shadow py-1 px-3 rounded-xl bg-white hover:bg-slate-100 w-fit
        text-slate-700 border-2 border-slate-300 font-medium ${props.className}`}
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}>

            {props.children}
        </button>
    )
}

export default Button;