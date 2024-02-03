import { Comment } from '@/common/components/post/Comment';
import CommentWriteArea from './CommentWriteArea';
import PromiseWrapper from '@/common/utils/wrapPromise';
import CommentInfo from '@/common/types/CommentInfo';

interface CommentsProps {
  className?: string,
  id: string,
  commentsPromise: PromiseWrapper
}

const Comments: React.FC<CommentsProps> = ({ className, id, commentsPromise }) => {
  const comments: CommentInfo[] = commentsPromise.Await() as CommentInfo[];

  console.log(comments);

  return (
    <div className={`max-w-5xl w-full
    ${className}`}>
      {
        comments.map((comment, idx) => {
          return (
            <Comment key={idx} liked={false} isReply={false} comment={comment} postId={id} />
          )
        })

      }


      <CommentWriteArea
        id={id}
      />
    </div>
  )
}

export default Comments;