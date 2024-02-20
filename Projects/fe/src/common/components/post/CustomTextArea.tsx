import { useEffect, useRef } from 'react';

interface CustomTextAreaProps {
    className?: string,
    content?: string,
    handleType: React.ChangeEventHandler<HTMLTextAreaElement>,
    onSelect?: React.ReactEventHandler<HTMLTextAreaElement>,
    onClick?: React.MouseEventHandler<HTMLTextAreaElement>,
    disabled?: boolean
    placeholder?: string
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
    className,
    content,
    handleType,
    onSelect,
    onClick,
    disabled,
    placeholder = "Type your comment...",
}) => {
    const hiddenTextArea = useRef<HTMLTextAreaElement>(null);
    const textArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        hiddenTextArea.current!.value = textArea.current!.value;
        hiddenTextArea.current!.style.height = 'auto';
        textArea.current!.style.height = hiddenTextArea.current!.scrollHeight + "px";
    }, [content]);

    return (
        <>
            <textarea ref={hiddenTextArea} className='invisible w-full' rows={1} />
            <textarea
                ref={textArea}
                value={content}
                onChange={handleType}
                maxLength={700}
                rows={1}
                onClick={onClick}
                className={`${className} w-full`}
                onSelect={onSelect}
                disabled={disabled}
                placeholder={placeholder}
            />
        </>
    )
}

export default CustomTextArea;