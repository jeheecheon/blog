import { Comment } from '@/common/components/post/Comment';
import CommentWriteArea from './CommentWriteArea';
import CommentInfo from '@/common/types/Comment';
import { PromiseAwaiter } from '@/common/utils/promiseWrapper';
import { convertStringDateIntoDate, sortComments } from '@/common/utils/comment';


interface CommentsProps {
  className?: string;
  postId: string;
  commentsAwaiter: PromiseAwaiter;
  setCommentsAwaiter: React.Dispatch<React.SetStateAction<PromiseAwaiter>>;
}

const Comments: React.FC<CommentsProps> = ({ className, postId, commentsAwaiter, setCommentsAwaiter }) => {
  const comments: CommentInfo[] = commentsAwaiter.Await() as CommentInfo[];

  convertStringDateIntoDate(comments);
  const sortedComments = sortComments(comments);
  console.log(sortedComments);

  return (
    <div className={`max-w-5xl w-full flex flex-col gap-2
    ${className}`}>
      {
        sortedComments.map(
          (comment, idx) =>
            <Comment
              key={idx}
              comment={comment}
              postId={postId}
              setCommentsAwaiter={setCommentsAwaiter}
            />
        )
      }

      <CommentWriteArea
        postId={postId}
        setCommentsAwaiter={setCommentsAwaiter}
        className='mt-2'
      />
    </div>
  )
}

export default Comments;