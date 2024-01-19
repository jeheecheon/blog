import React from 'react'
import { Comment } from '@/pages/blog/post/page/components/Comment';


export const Comments = ({ className }: {
  className?: string
}) => {
  return (
    <div className={`w-[900px] 
    ${className}`}>
      <div className=''>
        <Comment liked={false} isReply={false} />
        <Comment liked={false} isReply={true} />
        <Comment liked={false} isReply={true} />
        <Comment liked={false} isReply={false} />
        <Comment liked={false} isReply={true} />
      </div>

    </div>
  )
}
