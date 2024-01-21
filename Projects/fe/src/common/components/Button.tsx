import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Button = ({ children }: {
    children: React.ReactElement | string
}) => {
    const navigate = useNavigate();

    return (
        <button className="shadow py-1 px-3 rounded-xl bg-white hover:bg-slate-50 w-fit
        text-slate-700 border-2"
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}>
            {children}
        </button>
    )
}
