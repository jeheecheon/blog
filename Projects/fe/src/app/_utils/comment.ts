import CommentInfo from "@/_types/Comment";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

export const sortComments = (comments: CommentInfo[]) => {
    // Sort comments based on the uploaded_at property in ascending order
    comments.sort(
        (a, b) =>
            new Date(a.UploadedAt).getTime() - new Date(b.UploadedAt).getTime()
    );

    // Create a map to store comments organized by parent_comment_id
    const commentsByParent: Map<string, CommentInfo[]> = new Map();
    for (const comment of comments) {
        const parentCommentId = comment.ParentCommentId || ""; // Default to empty string if null

        if (!commentsByParent.has(parentCommentId))
            commentsByParent.set(parentCommentId, []);

        commentsByParent.get(parentCommentId)!.push(comment);
    }

    // Retrieve and flatten comments from the map
    const sortedComments: CommentInfo[] = [];
    const processComments = (parentId: string, depth: number) => {
        const parentComments = commentsByParent.get(parentId) || [];
        for (const parentComment of parentComments) {
            parentComment.depth = depth;
            sortedComments.push(parentComment);
            processComments(parentComment.Id, depth + 1);
        }
    };

    processComments("", 0);

    return sortedComments;
};

export const getTimeAgo = (uploadedAt: string): string => {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(uploadedAt).getTime();

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        let seconds = Math.floor(timeDifference / 1000);
        seconds = seconds < 0 ? 0 : seconds;
        return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (timeDifference < hour) {
        let minutes = Math.floor(timeDifference / minute);
        minutes = minutes < 0 ? 0 : minutes;
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < day) {
        let hours = Math.floor(timeDifference / hour);
        hours = hours < 0 ? 0 : hours;
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < month) {
        let days = Math.floor(timeDifference / day);
        days = days < 0 ? 0 : days;
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < year) {
        let months = Math.floor(timeDifference / month);
        months = months < 0 ? 0 : months;
        return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
        let years = Math.floor(timeDifference / year);
        years = years < 0 ? 0 : years;
        return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
};

export const sanitizeComments = (comments: CommentInfo[]) => {
    for (const comment of comments)
        comment.Content = parse(DOMPurify.sanitize(comment.Content));
};
