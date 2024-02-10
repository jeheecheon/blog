import CustomUndo from "./CustomUndo";
import CustomRedo from "./CustomRedo";
import CustomInsertStar from "./CustomInsertStar";

const CustomQuillToolbar = () => {
    return (
        <div id="toolbar">
            <div className="ql-formats">
                <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                    <option value="1">Header 1</option>
                    <option value="2">Header 2</option>
                    <option value="3">Header 3</option>
                    <option value="4">Header 4</option>
                    <option value="5">Header 5</option>
                    <option value="6">Header 6</option>
                    <option value="" selected>Normal</option>
                </select>
            </div>

            <div className="ql-formats">
                <select className="ql-size" defaultValue={""} onChange={e => e.persist()}>
                    <option value="extra-small">Extra Small</option>
                    <option value="small">Small</option>
                    <option value="" selected>Normal</option>
                    <option value="large">Large</option>
                    <option value="huge">Huge</option>
                </select>
            </div>

            <div className="ql-formats">
                <select className="ql-font" defaultValue={""} onChange={e => e.persist()}>
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>
            </div>

            <div className="ql-formats">
                <button className="ql-align" value=""></button>
                <button className="ql-align" value="center"></button>
                <button className="ql-align" value="right"></button>
                <button className="ql-align" value="justify"></button>
            </div>

            <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>

            <span className="ql-formats">
                <button className="ql-formula" />
                <button className="ql-code-block"></button>
                <button className="ql-clean"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-blockquote"></button>
                <button className="ql-script" value="sub"></button>
                <button className="ql-script" value="super"></button>
            </span>

            <span className="ql-formats">
                <select className="ql-color" defaultValue={""} onChange={e => e.persist()}>
                </select>
                <select className="ql-background" defaultValue={""} onChange={e => e.persist()}>
                </select>
            </span>

            <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-direction" value="rtl"></button>
            </span>

            <span className="ql-formats">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
            </span>

            <span className="ql-formats">
                <button className="ql-insertStar">
                    <CustomInsertStar />
                </button>
            </span>
        </div>
    )
}

export default CustomQuillToolbar;