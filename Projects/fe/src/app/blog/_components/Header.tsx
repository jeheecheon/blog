import React, { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "@/blog/_components/Avatar";
import me from "@/_assets/images/me.png";
import { useLocation } from "react-router-dom";

import MenuModal from "@/blog/_components/MenuModal";
import { Link } from "react-router-dom";
import DarkmodeToggleSwitch from "@/blog/_components/DarkmodeToggleSwitch";
import ArrowDown from "@/blog/_assets/images/arrow-down.svg?react";
import NavigationBar from "@/blog/_components/NavigationBar";

const excepts = ["/blog/post/edit"];

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const prevScrollY = useRef<number>(0);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
        useState<boolean>(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
    const location = useLocation();
    const shouldShowHeader = useMemo(
        () => !excepts.includes(location.pathname),
        [location.pathname]
    );

    const headerRef = useRef<HTMLDivElement>(null);
    const isScrollingDown = useRef<boolean>(false);
    const turningPoint = useRef<number>(0);

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("click", (e) => {
            const targetElement = e.target as HTMLElement;
            if (targetElement && targetElement.id !== "categories-button") {
                setIsCategoryMenuOpen(false);
            }
        });

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    useEffect(() => {
        setIsCategoryMenuOpen(false);
        setIsMenuModalOpen(false);
    }, [location.pathname]);

    const handleScroll = () => {
        setIsCategoryMenuOpen(false);

        if (prevScrollY.current < window.scrollY) {
            // Scrolling Down
            if (!isScrollingDown.current) {
                turningPoint.current = window.scrollY;
            }
            isScrollingDown.current = true;
        } else {
            // Scrolling Up
            if (isScrollingDown.current) {
                turningPoint.current = window.scrollY;
            }
            isScrollingDown.current = false;
        }

        const yDiff = Math.abs(window.scrollY - turningPoint.current);
        if (yDiff > 100) {
            if (isScrollingDown.current) {
                headerRef.current!.classList.add("animate-header-hide-up");
                headerRef.current!.classList.remove("animate-header-show-down");
            } else {
                headerRef.current!.classList.remove("animate-header-hide-up");
                headerRef.current!.classList.add("animate-header-show-down");
            }
        }
        prevScrollY.current = window.scrollY;
    };

    return (
        <>
            <MenuModal
                isOpen={isMenuModalOpen}
                setIsOpen={setIsMenuModalOpen}
            />

            <header
                ref={headerRef}
                className={`fixed top-0 left-0 mt-[13px] w-[100%] z-30 pointer-events-none animate-header-show-down
                    ${!shouldShowHeader && "hidden"}`}
            >
                <div
                    className="max-w-[1050px] sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto px-3 md:px-10
                    flex items-center justify-between"
                >
                    <Link
                        to="/"
                        className="pointer-events-auto rounded-full shadow-lg dark:shadow-black/50 shadow-gray-400/80"
                    >
                        <Avatar
                            avatar={me}
                            size={50}
                            className="ring-[2.5px] ring-orange-200 border-[1px] border-transparent"
                        />
                    </Link>

                    {/* MenuModal Open Button For Mobile view */}
                    <button
                        className="navbar:hidden pointer-events-auto overflow-visible dark:shadow-black/35
                        group ml-auto mr-5 flex flex-row items-center dark:bg-default-5-dark bg-default-2
                        shadow-lg border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                        rounded-full h-fit py-2 text-sm px-4 font-medium text-default-14-dark dark:text-default-10"
                        onClick={() => setIsMenuModalOpen(!isMenuModalOpen)}
                    >
                        Menu &#160;
                        <ArrowDown
                            className={`stroke-default-10-dark dark:stroke-default-13-dark relative top-[2px] w-[13px] ${
                                isMenuModalOpen && "rotate-180"
                            } transition-transform`}
                        />
                    </button>

                    {/* Navigation bar */}
                    <NavigationBar
                        isCategoryOpen={isCategoryMenuOpen}
                        setIsCategoryOpen={setIsCategoryMenuOpen}
                        className="navbar:flex hidden"
                    />

                    <DarkmodeToggleSwitch />
                </div>
            </header>
        </>
    );
};

export default Header;
