interface AvatarProps {
    className?: string;
    avatar: string | undefined;
    size?: number;
    children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
    className,
    avatar,
    size = 45,
    children,
}) => {
    return (
        <div className="h-fit shrink-0">
            {avatar && avatar !== "" ? (
                <img
                    src={avatar}
                    className={`rounded-full
                            ${className} `}
                    width={size}
                />
            ) : (
                children && (
                    <div
                        className="border-[1px] bg-default-9-dark dark:border-default-10-dark
                        ring-[1.5px] ring-orange-300 rounded-full"
                    >
                        {children}
                    </div>
                )
            )}
        </div>
    );
};

export default Avatar;
