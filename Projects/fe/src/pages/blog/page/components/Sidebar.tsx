import { Link } from "react-router-dom";

export const Sidebar = ({ show, setShowSidebar }: {
    show: boolean,
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const hidden = show ? "" : "-translate-x-full invisible";

    const handleLinkClicked = () => setShowSidebar(!show);
    return (<>
        <div className={`w-screen h-screen z-30 bg-white opacity-95 fixed duration-500 
        flex flex-col items-start justify-center pl-5
        ${hidden}`}>
            <Link to="/blog/posts" onClick={handleLinkClicked}>
                Latest posts
            </Link>
            <span>
                Categories
            </span>
            <Link to="/blog" onClick={handleLinkClicked}>
                Test button
            </Link>
        </div>
    </>
    )
}
