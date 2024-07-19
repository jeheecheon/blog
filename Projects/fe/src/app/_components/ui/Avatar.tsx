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
                    alt="author avatar"
                    className={`rounded-full
                            ${className} `}
                    style={{
                        width: `${size / 16}rem`,
                    }}
                />
            ) : (
                children && (
                    <div
                        className="border-[0.0625rem] bg-default-9-dark dark:border-default-10-dark
                        ring-[0.156rem] ring-orange-300 rounded-full"
                    >
                        {children}
                    </div>
                )
            )}
        </div>
    );
};

export default Avatar;
