import CommentInfo from "../types/CommentInfo";

export const convertStringDateIntoDate = (
    comments: CommentInfo[]
) => {
    comments.forEach(ele =>
        ele.uploaded_at = new Date(Date.parse(ele.uploaded_at.toString()))
    );
}

export const sortComments = (
    comments: CommentInfo[]
) => {
    // Sort comments based on the uploaded_at property in ascending order
    comments.sort((a, b) => (a.uploaded_at as Date).getTime() - (b.uploaded_at as Date).getTime());

    // Create a map to store comments organized by parent_comment_id
    const commentsByParent: Map<string, CommentInfo[]> = new Map();
    for (const comment of comments) {
        const parentCommentId = comment.parent_comment_id || ''; // Default to empty string if null

        if (!commentsByParent.has(parentCommentId))
            commentsByParent.set(parentCommentId, []);

        commentsByParent.get(parentCommentId)!.push(comment);
    }

    // Retrieve and flatten comments from the map
    const sortedComments: CommentInfo[] = [];
    const processComments = (parentId: string) => {
        const parentComments = commentsByParent.get(parentId) || [];
        for (const parentComment of parentComments) {
            sortedComments.push(parentComment);
            processComments(parentComment.id);
        }
    };

    processComments('');

    return sortedComments;
}

export const getTimeAgo = (uploadedAt: Date): string => {
    const now = new Date();
    const timeDifference = now.getTime() - uploadedAt.getTime();

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        const seconds = Math.floor(timeDifference / 1000);
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDifference < month) {
        const days = Math.floor(timeDifference / day);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeDifference < year) {
        const months = Math.floor(timeDifference / month);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(timeDifference / year);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
};

// content: "첫 댓글!!"
// email: "jeheecheon@gmail.com"
// id: "b5e3d368-b29c-40c6-b05b-2a5f5fd2a805"
// is_deleted: false
// parent_comment_id: null
// post_id: "3b616fe5-58cb-40f6-855d-a3b5bcf72b4a"
// uploaded_at: "2024-02-04T08:36:40.705686Z"