import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/blog/_components/Button";
import CustomTextArea from "@/blog/post/_components/CustomTextArea";
import Avatar from "@/blog/_components/Avatar";
import { makeVisible } from "../../../_redux/signInModalSlice";
import { HandleError } from "@/_utils/responses";
import AvatarDefault from "@/blog/post/_assets/images/AvatarDefault";
import { selectUser } from "@/_redux/userSlice";

interface CommentWriteAreaProps {
    postId: string;
    replyingTo?: string;
    handleCancelClicked?: () => void | undefined;
    refreshComments: () => void;
    className?: string;
}

const CommentWriteArea: React.FC<CommentWriteAreaProps> = React.memo(
    ({
        postId,
        replyingTo,
        handleCancelClicked,
        refreshComments,
        className,
    }) => {
        const user = useSelector(selectUser);
        const isAuthenticated = useMemo(
            () =>
                user.email !== undefined &&
                user.email !== null &&
                user.email !== "",
            [user.email]
        );
        const dispatch = useDispatch();
        const [content, setContent] = useState("");

        const handleType: React.ChangeEventHandler<HTMLTextAreaElement> = (
            e
        ) => {
            if (isAuthenticated === false) dispatch(makeVisible());
            else {
                setContent(e.currentTarget.value);
            }
        };

        const handleUpload = () => {
            fetch(`/api/blog/post/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content,
                    parent_comment_id: replyingTo,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        refreshComments();
                        setContent("");
                    } else HandleError(res);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to upload the comment..");
                })
                .finally(() => handleCancelClicked && handleCancelClicked());
        };

        return (
            <div
                className={`rounded-lg flex flex-col w-full
                px-4 py-3 bg-default-4 dark:bg-body  ${className}`}
            >
                <div className="flex w-full gap-3">
                    <Avatar
                        avatar={
                            isAuthenticated && user.avatar
                                ? user.avatar
                                : undefined
                        }
                        size={45}
                    >
                        <AvatarDefault />
                    </Avatar>
                    <CustomTextArea
                        content={content}
                        handleType={handleType}
                        className="focus:outline-none resize-none
                        border-b-[1px] border-slate-500 rounded-none
                        bg-transparent"
                    />
                </div>

                <div className="flex items-center justify-end w-full gap-3 text-sm flex-wrap">
                    <Button
                        onClick={handleUpload}
                        className="text-orange-400 dark:text-orange-400 font-bold dark:font-normal text-sm"
                    >
                        Upload
                    </Button>
                    {replyingTo && (
                        <Button
                            onClick={() => {
                                setContent("");
                                if (handleCancelClicked !== undefined)
                                    handleCancelClicked();
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </div>
        );
    }
);

export default CommentWriteArea;
