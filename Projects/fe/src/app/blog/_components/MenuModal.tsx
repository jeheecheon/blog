import { useEffect, useMemo, useState } from "react";
import Rodal from "rodal";
import { useIsMounted } from "../../_hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";
import { makeVisible } from "@/_redux/signInModalSlice";
import { RootState } from "@/_redux/store";
import { Link } from "react-router-dom";
import { SignOut } from "../_utils/user";
import { calculateModalWidth } from "@/blog/_utils/modal";

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
    const user = useSelector((state: RootState) => state.user);
    const isAuthenticated = useMemo(() => user.email !== "", [user.email]);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => setModalWidth(calculateModalWidth());
        if (isMount === true)
            window.addEventListener("resize", () => handleResize());

        return () => window.removeEventListener("resize", handleResize);
    }, [modalWidth]);

    return (
        <Rodal
            visible={isOpen}
            customStyles={{
                borderRadius: "22px",
                backgroundColor: `${
                    isDarkMode ? "rgb(24, 24, 27)" : "rgb(250, 250, 250)"
                }`,
                padding: "25px 30px 25px 30px",
            }}
            className="rounded-full"
            width={modalWidth}
            height={575}
            onClose={() => setIsOpen(!isOpen)}
        >
            <div>
                <p className="text-orange-400 text-lg mb-5">Settings</p>
                <nav className="flex flex-col text-default-10-dark dark:text-default-10 font-medium items-start">
                    <div className="w-full border-b-[2px] pb-3 border-b-default-5 dark:border-b-default-7-dark">
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    SignOut(dispatch);
                                }}
                            >
                                Sign-out
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    dispatch(makeVisible());
                                }}
                            >
                                Sign-in
                            </button>
                        )}
                    </div>

                    <p className="text-orange-400 text-lg mt-5 mb-5">
                        Navigation
                    </p>
                    <Link
                        className="w-full border-b-[2px] pb-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog"
                    >
                        Home
                    </Link>
                    <Link
                        className="w-full border-b-[2px] py-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog/about-me"
                    >
                        About
                    </Link>
                    <Link
                        className="w-full border-b-[2px] py-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog/recent-posts/pages/1"
                    >
                        Recent Posts
                    </Link>
                    <Link
                        className="w-full border-b-[2px] py-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog/categories/Uncategorized/pages/1"
                    >
                        Uncategorized
                    </Link>
                    <Link
                        className="w-full border-b-[2px] py-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog/categories/Algorithm/pages/1"
                    >
                        Algorithm
                    </Link>
                    <Link
                        className="w-full border-b-[2px] py-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog/categories/ASP.NET/pages/1"
                    >
                        ASP.NET
                    </Link>
                    <Link
                        className="w-full border-b-[2px] py-3 border-b-default-5 dark:border-b-default-7-dark"
                        to="/blog/categories/Spring/pages/1"
                    >
                        Spring
                    </Link>
                    <Link
                        className="w-full pt-2"
                        to="/blog/categories/React/pages/1"
                    >
                        React
                    </Link>
                </nav>
            </div>
        </Rodal>
    );
};

export default MenuModal;
