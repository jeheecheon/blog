interface PageNavSkeletonProps {
    className?: string;
}

function PageNavSkeleton({ className }: PageNavSkeletonProps) {
    return (
        <div className={`h-8 flex gap-3 ${className}`}>
            <div className="w-[4.5rem] h-full rounded-full blur-effect" />
            <div className="w-[2rem] h-full rounded-full blur-effect" />
            <div className="w-[2rem] h-full rounded-full blur-effect" />
            <div className="w-[4.5rem] h-full rounded-full blur-effect" />
        </div>
    );
}

export default PageNavSkeleton;
