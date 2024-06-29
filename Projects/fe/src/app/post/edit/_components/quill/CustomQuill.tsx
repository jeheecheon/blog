import ReactQuill from "react-quill";
import { formats, modules } from "@/post/edit/_utils/quill-settings";

interface CustomQullProps {
    setContent: (arg0: string) => void;
    content: string;
    className?: string;
}

const CustomQuill: React.FC<CustomQullProps> = ({
    setContent,
    content,
    className,
}) => {
    return (
        <div className={`${className}`}>
            <ReactQuill
                theme="snow"
                className="w-full"
                value={content}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                    setContent(value);
                }}
            />
        </div>
    );
};

export default CustomQuill;
