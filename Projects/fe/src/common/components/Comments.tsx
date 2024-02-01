import { Comment } from '@/common/components/Comment';
import CommentWriteArea from './CommentWriteArea';

interface CommentsProps {
  className?: string,
  id?: string
}

const Comments: React.FC<CommentsProps> = ({ className, id }) => {

  return (
    <div className={`max-w-5xl w-full
    ${className}`}>
      <Comment liked={false} isReply={false} />
      <Comment liked={false} isReply={false} />
      <Comment liked={false} isReply={false} />

      <CommentWriteArea
        id={id}
      />
    </div>
  )
}

export default Comments;