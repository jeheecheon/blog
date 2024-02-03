import { Comment } from '@/common/components/post/Comment';
import CommentWriteArea from './CommentWriteArea';
import PromiseWrapper from '@/common/utils/wrapPromise';

interface CommentsProps {
  className?: string,
  id: string,
  commentsPromise: PromiseWrapper
}

const Comments: React.FC<CommentsProps> = ({ className, id, commentsPromise }) => {
  const comments: Comment[] = commentsPromise.Await() as Comment[];
  console.log(comments);

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