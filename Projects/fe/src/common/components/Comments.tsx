import { Comment } from '@/common/components/Comment';
import CommentWriteArea from './CommentWriteArea';

interface CommentsProps {
  className?: string
}

const Comments = ({ className }: CommentsProps) => {

  return (
    <div className={`max-w-5xl w-full
    ${className}`}>
      <Comment liked={false} isReply={false} />
      <Comment liked={false} isReply={true} />
      <Comment liked={false} isReply={true} />
      <Comment liked={false} isReply={false} />
      <Comment liked={false} isReply={true} />

      <CommentWriteArea/>
    </div>
  )
}

export default Comments;