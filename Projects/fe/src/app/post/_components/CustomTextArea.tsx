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
    placeholder = "Write a comment...",
}) => {
    const hiddenTextArea = useRef<HTMLTextAreaElement>(null);
    const textArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        hiddenTextArea.current!.value = textArea.current!.value;
        hiddenTextArea.current!.style.height = 'auto';
        textArea.current!.style.height = hiddenTextArea.current!.scrollHeight + "px";
    }, [content]);

    return (
        <div className='flex flex-col w-full'>
            <textarea
                ref={textArea}
                value={content}
                onChange={handleType}
                maxLength={700}
                rows={1}
                onClick={onClick}
                className={`${className} w-full relative bottom-4 overflow-y-hidden`}
                onSelect={onSelect}
                disabled={disabled}
                placeholder={placeholder}
            />
            <textarea ref={hiddenTextArea} className='invisible w-full overflow-y-hidden' rows={1} />
        </div>
    )
}

export default CustomTextArea;