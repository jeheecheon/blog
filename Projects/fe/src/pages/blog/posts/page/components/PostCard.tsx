import { Button } from '@common/components/button'
import React from 'react'

export const PostCard = ({ className }: { className?: string }) => {
    return (
        <div className={`mb-12 p-5
        bg-white shadow-sm shadow-zinc-400 text-slate-700 rounded-lg 
        ${className}`}>
            <div className='font-bold text-2xl mb-3 text-pretty'>This is an example title</div>
            <div className='text-md text-balance mb-2'>
                New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.
            </div>

            <div className='text-sky-700 text-right mb-1'>#벡준, #내인생, #힘들다, #ㅠㅠ</div>

            <div className='flex justify-between content-end'>
                <Button content='Read' className='' />
                <div className='flex flex-col'>
                    <div className='inline-block text-wrap'>Categories: 알고리즘, DP</div>
                    <div className='inline mt-auto text-right'>2024-01-01</div>
                </div>
            </div>
        </div>
    )
}
