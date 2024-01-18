import React from 'react'

export const Button = ({ className, content = "Button" }: { className?: string, content?: string }) => {
    return (
        <div className={`inline border-[1.5px] p-2 font-medium text-md cursor-pointer 
        shadow shadow-zinc-300 rounded-lg font-['Noto_Sans_KR'] h-fit self-end 
        hover:bg-slate-100 hover:font text-sky-700
        ${className}`}>
            {content}
        </div>
    )
}
