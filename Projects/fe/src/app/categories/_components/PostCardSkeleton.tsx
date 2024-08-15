interface PostCardSkeletonProps {
    className?: string;
}

function PostCardSkeleton({ className }: PostCardSkeletonProps) {
    return (
        <div
            className={`h-fit w-full flex flex-col gap-y-4 md:gap-y-0 md:flex-row-reverse gap-x-3 px-1 ${className}`}
        >
            <div className="mx-3 md:w-[15rem] h-[13rem] blur-effect" />

            <div className="w-full flex flex-col px-3 md:px-0 ">
                <div className="flex flex-col md:flex-col-reverse gap-2">
                    {/* Title */}
                    <div className="h-5 w-1/2 blur-effect" />
                    {/* Date */}
                    <div className="h-3 w-1/4 blur-effect" />
                </div>

                {/* Content */}
                <div className="mt-4 h-10 w-full blur-effect" />

                <div className="h-5 mt-3 md:mt-auto flex justify-between items-end text-stone-500 dark:text-default-14">
                    {/* Categories */}
                    <div className="h-full w-1/3 blur-effect" />

                    {/* Comments & Likes */}
                    <div className="flex gap-2 w-1/4">
                        <div className="h-5 w-1/2 blur-effect" />
                        <div className="h-5 w-1/2 blur-effect" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCardSkeleton;
