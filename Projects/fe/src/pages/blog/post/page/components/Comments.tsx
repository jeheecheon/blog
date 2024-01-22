import { Comment } from '@/pages/blog/post/page/components/Comment';

const Comments = ({ className }: {
  className?: string
}) => {
  return (
    <div className={`max-w-5xl w-full
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

export default Comments;