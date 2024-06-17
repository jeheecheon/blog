import { Quill } from "react-quill";

// Add highlighting
import hljs from "@/blog/_utils/highlightSettings";

// Add formular format
import katex from "katex";
import "katex/dist/katex.min.css";
import { handleError, throwError, throwResponse } from "@/_utils/responses";
import { serverUrl } from "@/_utils/site";
window.katex = katex;

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = [
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
    "Noto_Sans_KR",
];
Quill.register(Font, true);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function undoChange(this: any) {
    this.quill.history.undo();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function redoChange(this: any) {
    this.quill.history.redo();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertStar(this: any) {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "★");
    this.quill.setSelection(cursorPosition + 1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function insertImage(this: any) {
    // Get the post id that the writer is editing on
    const post_id = (
        document.getElementById("IdOfPostEditing") as HTMLInputElement
    ).value;
    if (post_id === null || post_id === undefined) return;

    // Create an input tag and get it clicked
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // 파일 형식을 제한하고 싶은 경우
    input.click();

    // Wait until any file has been selected
    await new Promise((resolve) => {
        input.addEventListener("change", resolve, { once: true });
    });

    // Store the selected image into this var
    const image = (input as HTMLInputElement).files![0];

    // Error checking if the file was successfuly selected
    if (image === undefined || image === null) {
        console.error("File not selected...");
        return;
    }

    // Prepare for file transter
    let imageUrl = "";
    const formData = new FormData();
    formData.append("image", image);
    await fetch(`${serverUrl}/api/blog/posts/${post_id}/images/upload`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        method: "POST",
        body: formData,
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throwResponse(res);
            }
        })
        .then((newImageUrl: string) => {
            if (newImageUrl && newImageUrl !== "") {
                console.log(newImageUrl);
                imageUrl = newImageUrl;
            } else {
                throwError("Failed to upload the image");
            }
        })
        .catch(handleError);

    // Insert an image tag with the returned image url when the fetch call was successful
    if (imageUrl !== "") {
        const cursorPosition = this.quill.getSelection().index;
        this.quill.pasteHTML(cursorPosition, `<img src="${imageUrl}" />`);
        this.quill.setSelection(cursorPosition + 1);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function insertCodeBlock(this: any) {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.pasteHTML(cursorPosition, `<pre/>`);
}

export const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            undo: undoChange,
            redo: redoChange,
            "custom-star": insertStar,
            "custom-image": insertImage,
            "custom-code-block": insertCodeBlock,
        },
    },
    clipboard: {
        matchVisual: true,
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
    syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
    },
};

export const formats = [
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
    "video",
    "image",
    "color",
    "code-block",
    "formula",
];
