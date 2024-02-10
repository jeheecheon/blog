import ReactQuill, { Quill } from "react-quill";
import { insertStar, redoChange, undoChange } from "@/pages/blog/post/edit/page/utils/quill";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);


interface CustomQullProps {
    setContent: React.Dispatch<React.SetStateAction<string>>;
    content: string;
}

const CustomQuill: React.FC<CustomQullProps> = ({
    setContent,
    content
}) => {
    return (
        <ReactQuill
            theme="snow"
            value={content}
            modules={modules}
            formats={formats}
            className='w-full'
            onChange={() => {
                console.log(content)
                setContent(content)
            }}
        />)
}

const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            undo: undoChange,
            redo: redoChange,
            insertStar: insertStar
        }
    },
    clipboard: {
        matchVisual: true,
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
}

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

export default CustomQuill