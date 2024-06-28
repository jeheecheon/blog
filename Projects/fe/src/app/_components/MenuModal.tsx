import { useEffect, useState } from "react";
import Rodal from "rodal";
import { useIsMounted } from "@/_hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { Link } from "react-router-dom";
import { signOut } from "@/_utils/user";
import { makeVisible } from "@/_redux/signInModalSlice";
import { selectIsSignedIn } from "@/_redux/userSlice";

const calculateModalWidth = () => {
    let result;

    if (document.body.clientWidth <= 880) {
        if (document.body.clientWidth >= 830)
            result =
                document.body.clientWidth - 880 - document.body.clientWidth;
        else result = document.body.clientWidth - 50;
    } else result = 830;
    return result;
};

const navLinks = [
    {
        name: "Home",
        to: "/",
    },
    {
        name: "Portfolio",
        to: import.meta.env.VITE_PORTFOLIO_URL,
    },
];

const categoryLinks = [
    {
        name: "Recent Posts",
        to: "/recent-posts/pages/1",
    },
    {
        name: "Algorithm",
        to: "/categories/Algorithm/pages/1",
    },
    {
        name: "Web Development",
        to: "/categories/Web-Development/pages/1",
    },
    {
        name: "Uncategorized",
        to: "/categories/Uncategorized/pages/1",
    },
];

interface MenuModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, setIsOpen }) => {
    const [modalWidth, setModalWidth] = useState(calculateModalWidth());
    const isMount = useIsMounted();
    const isDarkMode = useSelector(
        (state: RootState) => state.theme.isDarkMode
    );
    const dispatch = useDispatch();
    const isSignedIn = useSelector(selectIsSignedIn);

    useEffect(() => {
        const handleResize = () => setModalWidth(calculateModalWidth());
        if (isMount === true)
            window.addEventListener("resize", () => handleResize());

        return () => window.removeEventListener("resize", handleResize);
    }, [modalWidth]);

    function convertLinksToJsx(
        links: { name: string; to: string }[],
        title: string
    ) {
        return (
            <>
                <p className="text-orange-400 text-lg">{title}</p>
                <nav className="flex flex-col text-default-18-dark text-sm dark:text-default-10 mt-1">
                    {links.map((link, index) => {
                        const className =
                            "w-full py-2 border-b-[0.1rem] dark:border-y-default-7-dark border-y-default-5";

                        return (
                            <span key={index} className={className}>
                                {link.to?.includes("Portfolio") ? (
                                    <a href={link.to}>{link.name}</a>
                                ) : (
                                    <Link
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
            </>
        );
    }

    return (
        <Rodal
            visible={isOpen}
            customStyles={{
                borderRadius: "1.375rem",
                backgroundColor: `${
                    isDarkMode ? "rgb(24, 24, 27)" : "rgb(250, 250, 250)"
                }`,
                padding: "1.5625rem 1.875rem 1.5625rem 1.875rem",
            }}
            width={modalWidth}
            height={400}
            onClose={() => setIsOpen(!isOpen)}
        >
            <div className="h-full flex flex-col justify-between">
                <div>
                    {convertLinksToJsx(navLinks, "Navigation")}
                    <button
                        className="text-default-18-dark text-sm dark:text-default-10 w-full text-left py-2 
                        border-b-[0.1rem] border-y-default-5 dark:border-y-default-7-dark"
                        onClick={() => {
                            setIsOpen(false);
                            if (isSignedIn) {
                                signOut();
                            } else {
                                dispatch(makeVisible());
                            }
                        }}
                    >
                        {isSignedIn ? "Sign-out" : "Sign-in"}
                    </button>
                </div>

                <div className="mt-5">
                    {convertLinksToJsx(categoryLinks, "Category")}
                </div>

                {/* <div className="mt-5">
                    <p className="text-orange-400 text-lg mb-2">Settings</p>
                    
                </div> */}
            </div>
        </Rodal>
    );
};

export default MenuModal;
