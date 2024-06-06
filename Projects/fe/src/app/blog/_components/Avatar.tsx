interface AvatarProps {
    className?: string;
    avatar: string | undefined;
    width?: number;
    children?: React.ReactNode
}

const Avatar: React.FC<AvatarProps> = ({
    className,
    avatar,
    width = 45,
    children
}) => {
    return (
        <div className="">
            {
                avatar && avatar !== ""
                    ? <img
                        src={avatar}
                        className={`rounded-full
                            ${className} `}
                        width={width}
                    />
                    : children && <div
                        className="rounded-full 
                    border-[1px] bg-default-9-dark dark:border-default-10-dark
                    ring-[1.5px] ring-orange-300 rounded-full"
                    >
                        {children}
                    </div>

            }
        </div>
    )
}

export default Avatar;