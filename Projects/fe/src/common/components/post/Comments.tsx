import { Comment } from '@/common/components/post/Comment';
import CommentWriteArea from './CommentWriteArea';
import CommentInfo from '@/common/types/Comment';
import { PromiseAwaiter } from '@/common/utils/promiseWrapper';
import { convertStringDateIntoDate, sortComments } from '@/common/utils/comment';
import React, { useMemo } from 'react';


interface CommentsProps {
  className?: string;
  postId: string;
  commentsAwaiter: PromiseAwaiter;
  refreshComments: () => void;
}

const Comments: React.FC<CommentsProps> = React.memo(({ className, postId, commentsAwaiter, refreshComments }) => {
  const sortedComments: CommentInfo[] = useMemo(() => {
    const awaitedComments: CommentInfo[] = commentsAwaiter.Await() as CommentInfo[];
    return sortComments(convertStringDateIntoDate(awaitedComments.map(c => c)))
  }, [commentsAwaiter]
  );

  return (
    <div className={`max-w-[1024px] w-full flex flex-col
    ${className}`}>
      {
        sortedComments.map(
          (comment) =>
            <Comment
              key={comment.Id}
              comment={comment}
              postId={postId}
              refreshComments={refreshComments}
            />
        )
      }

      <CommentWriteArea
        postId={postId}
        refreshComments={refreshComments}
        className='mt-2'
      />
    </div>
  )
});

export default Comments;