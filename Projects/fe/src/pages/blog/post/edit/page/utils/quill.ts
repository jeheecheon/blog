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