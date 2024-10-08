import { useEffect, useRef } from "react";

interface CustomTextAreaProps {
    className?: string;
    content?: string;
    handleType: React.ChangeEventHandler<HTMLTextAreaElement>;
    onSelect?: React.ReactEventHandler<HTMLTextAreaElement>;
    onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
    placeholder?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
    className,
    content,
    handleType,
    onSelect,
    onClick,
    disabled,
    placeholder = "Leave a comment...",
}) => {
    const hiddenTextArea = useRef<HTMLTextAreaElement>(null);
    const textArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        hiddenTextArea.current!.value = textArea.current!.value;
        hiddenTextArea.current!.style.height = "auto";
        textArea.current!.style.height =
            hiddenTextArea.current!.scrollHeight + "px";
    }, [content]);

    return (
        <div className="flex flex-col w-full">
            <textarea
                ref={textArea}
                value={content}
                onChange={handleType}
                maxLength={700}
                rows={1}
                onClick={onClick}
                className={`${className} w-full relative bottom-4 overflow-y-hidden 
                font-[335] text-default-10-dark dark:text-default-14
                placeholder:text-stone-500/80 placeholder:font-[330] caret-orange-400 focus:placeholder:text-white/0
                placeholder:text-sm`}
                onSelect={onSelect}
                disabled={disabled}
                placeholder={placeholder}
            />
            <textarea
                ref={hiddenTextArea}
                className="invisible w-full overflow-y-hidden"
                rows={1}
            />
        </div>
    );
};

export default CustomTextArea;
