interface AvatarProps {
    className?: string,
    avatar: string | undefined
}

const Avatar: React.FC<AvatarProps> = ({
    className,
    avatar
}) => {
    return (
        <img src={avatar} className={`w-[40px] rounded-full
        ${className}`} />
    )
}

export default Avatar;