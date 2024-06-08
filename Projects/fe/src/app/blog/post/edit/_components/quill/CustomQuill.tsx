import ReactQuill from "react-quill";
import { formats, modules } from "@/blog/post/edit/utils/quill-settings";
import CustomQuillToolbar from "./CustomQuillToolbar";

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
            <CustomQuillToolbar className="w-full sticky top-0 bg-white opacity-100 z-[50]" />
            <ReactQuill
                theme="snow"
                className="w-full"
                value={content}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                    console.log(value);
                    setContent(value);
                }}
            />
        </div>
    );
};

export default CustomQuill;
