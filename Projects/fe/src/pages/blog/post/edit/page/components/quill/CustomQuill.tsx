import ReactQuill from "react-quill";
import { formats, modules } from "@/pages/blog/post/edit/page/utils/quill-settings";

interface CustomQullProps {
    setContent: (arg0: string) => void;
    content: string;
    className?: string;
}

const CustomQuill: React.FC<CustomQullProps> = ({
    setContent,
    content,
    className
}) => {
    return (
        <ReactQuill
            theme="snow"
            value={content}
            modules={modules}
            formats={formats}
            className={`${className}`}
            onChange={(value) => {
                console.log(value)
                setContent(value)
            }}
        />
    )
}

export default CustomQuill