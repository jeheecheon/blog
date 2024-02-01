import { useEffect, useRef } from 'react';

interface CustomTextAreaProps {
    className?: string,
    context?: string,
    setContext: React.Dispatch<React.SetStateAction<string>>,
    onSelect?: React.ReactEventHandler<HTMLTextAreaElement>,
    onClick?: React.MouseEventHandler<HTMLTextAreaElement>,
    disabled: boolean
}

const CustomTextArea: React.FC<CustomTextAreaProps> = (props) => {
    const hiddenTextArea = useRef<HTMLTextAreaElement>(null);
    const textArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        hiddenTextArea.current!.value = textArea.current!.value;
        hiddenTextArea.current!.style.height = 'auto';
        textArea.current!.style.height = hiddenTextArea.current!.scrollHeight + "px";
    }, [props.context]);

    return (
        <>
            <textarea ref={hiddenTextArea} className='invisible w-full' rows={1} />
            <textarea
                ref={textArea}
                onChange={(e) => props.setContext(e.currentTarget.value)}
                maxLength={700}
                rows={1}
                onClick={props.onClick}
                className={`${props.className} w-full`}
                onSelect={props.onSelect}
                disabled={props.disabled}
            />
        </>
    )
}

export default CustomTextArea;