import { Quill } from "react-quill";

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
  // Create an input tag and get it clicked
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*'; // 파일 형식을 제한하고 싶은 경우
  input.click();

  // Wait until any file has been selected
  await new Promise((resolve) => {
    input.addEventListener('change', resolve, { once: true });
  });

  // Store the selected image into this var
  const image = (input as HTMLInputElement).files![0];

  // Error checking if the file was successfuly selected
  if (image === undefined || image === null) {
    console.log("File not selected...");
    return;
  }

  // Prepare for file transter
  let imageUrl = "";
  const formData = new FormData();
  formData.append('image', image)
  await fetch(`/api/test/posts/${1}/images/upload`, {
    credentials: 'same-origin',
    method: 'POST',
    body: formData
  })
    .then(res => {
      if (res.ok)
        return res.json();
    })
    .then(res => {
      console.log(res.imageUrl);
      imageUrl = res.imageUrl;
    })

  // Insert an image tag with the returned image url when the fetch call was successful
  if (imageUrl !== "") {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.pasteHTML(cursorPosition, `<img src="${imageUrl}" />`);
    this.quill.setSelection(cursorPosition + 1);
  }
}

export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      insertStar: insertStar,
      customImage: insertImage
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
  "image",
  "color",
  "code-block"
];