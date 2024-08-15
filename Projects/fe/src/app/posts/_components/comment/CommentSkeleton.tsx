function CommentSkeleton() {
    return (
        <div className="py-4 space-y-2">
            <div className="w-full flex flex-row">
                {/* Avatar */}
                <div className="w-[2.375rem] h-[2.375rem] blur-effect rounded-full" />

                {/* Date and Email */}
                <div className="flex flex-col ml-2 justify-center gap-3">
                    <div className="w-10 h-4 blur-effect" />
                    <div className="w-[9rem] h-4 blur-effect" />
                </div>
            </div>

            {/* Content */}
            <div className="w-full h-20 blur-effect" />

            {/* Likes and Reply Button */}
            <div className="flex flex-row gap-3">
                <div className="w-16 h-5 blur-effect" />
                <div className="w-16 h-5 blur-effect" />
            </div>
        </div>
    );
}

export default CommentSkeleton;
