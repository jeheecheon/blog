import { Comment } from '@/common/components/post/Comment';
import CommentWriteArea from './CommentWriteArea';
import CommentInfo from '@/common/types/CommentInfo';
import { PromiseAwaiter } from '@/common/utils/promiseWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store';
import { convertStringDateIntoDate, sortComments } from '@/common/utils/comment';

interface CommentsProps {
  className?: string,
  id: string,
}

const Comments: React.FC<CommentsProps> = ({ className, id }) => {
  const commentsPromise: PromiseAwaiter = useSelector((state: RootState) => state.promises.comments);
  const comments: CommentInfo[] = commentsPromise.Await() as CommentInfo[];

  convertStringDateIntoDate(comments);
  const sortedComments = sortComments(comments);

  return (
    <div className={`max-w-5xl w-full
    ${className}`}>
      {
        sortedComments.map(
          (comment, idx) =>
            <Comment
              key={idx}
              comment={comment}
            />
        )
      }

      <CommentWriteArea
        postId={id}
      />
    </div>
  )
}

export default Comments;