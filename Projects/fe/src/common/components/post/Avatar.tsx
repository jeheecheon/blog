interface AvatarProps {
    className?: string;
    avatar: string | undefined;
    width?: number;
}

const Avatar: React.FC<AvatarProps> = ({
    className,
    avatar,
    width = 40
}) => {
    return (
        <img src={avatar} className={`w-[${width}px] h-[${width}px] 
        rounded-full 
        ${className}`} 
        />
    )
}

export default Avatar;