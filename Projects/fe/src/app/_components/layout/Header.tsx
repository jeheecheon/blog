import React, { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "@/_components/ui/Avatar";
import me from "@/_assets/images/me.webp";
import { useLocation } from "react-router-dom";

import MenuModal from "@/_components/modal/MenuModal";
import { Link } from "react-router-dom";
import DarkmodeToggleSwitch from "@/_components/layout/DarkmodeToggleSwitch";
import ArrowDown from "@/_assets/images/arrow-down.svg?react";
import NavigationBar from "@/_components/layout/NavigationBar";
import { createPortal } from "react-dom";

const excepts = ["/post/edit"];

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const prevScrollY = useRef<number>(0);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
        useState<boolean>(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
    const location = useLocation();
    const shouldShowHeader = useMemo(
        () => !excepts.includes(location.pathname),
        [location.pathname]
    );
    const [profileLoaded, setProfileLoaded] = useState<boolean>(false);
    const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const isScrollingDown = useRef<boolean>(false);
    const turningPoint = useRef<number>(0);

    useEffect(() => {
        function handleResize() {
            if (!headerRef.current) return;
            const children = headerRef.current!.children;
            const firstChild = children[0] as HTMLElement;
            const secondChild = children[1] as HTMLElement;
            const thirdChild = children[2] as HTMLElement;
            const fourthChild = children[3] as HTMLElement;

            setNavbarOpen(
                firstChild.offsetWidth +
                    secondChild.offsetWidth +
                    thirdChild.offsetWidth +
                    fourthChild.offsetWidth <
                    headerRef.current.offsetWidth
            );
        }
        handleResize();

        function handleClcikWhenModalOpen(e: MouseEvent) {
            const targetElement = e.target as HTMLElement;
            if (targetElement && targetElement.id !== "categories-button") {
                setIsCategoryMenuOpen(false);
            }
        }

        document.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleClcikWhenModalOpen);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClcikWhenModalOpen);
            window.removeEventListener("resize", handleResize);
        };
    });

    useEffect(() => {
        setIsCategoryMenuOpen(false);
        setIsMenuModalOpen(false);
    }, [location.pathname]);

    const handleScroll = () => {
        setIsCategoryMenuOpen(false);

        if (window.scrollY < 0) return;

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
        if (yDiff > 100 || (window.scrollY < 100 && window.scrollY >= 0)) {
            if (isScrollingDown.current) {
                headerRef.current?.classList.add("animate-header-hide-up");
                headerRef.current?.classList.remove("animate-header-show-down");
            } else {
                headerRef.current?.classList.remove("animate-header-hide-up");
                headerRef.current?.classList.add("animate-header-show-down");
            }
        }
        prevScrollY.current = window.scrollY;
    };

    return (
        <>
            {shouldShowHeader && (
                <>
                    <MenuModal
                        isOpen={isMenuModalOpen}
                        setIsOpen={setIsMenuModalOpen}
                    />

                    <img
                        src={me}
                        alt="blog author image"
                        className="hidden"
                        onLoad={() => setProfileLoaded(true)}
                    />

                    {profileLoaded &&
                        createPortal(
                            <div
                                className="fixed top-0 left-0 w-[100%] z-30 pointer-events-none
                            px-4 md:px-14 lg:px-16"
                            >
                                <header
                                    ref={headerRef}
                                    className={`flex items-center justify-between animate-header-show-down
                                mx-auto ${className}`}
                                >
                                    <Link
                                        to="/"
                                        className="shrink-0 pointer-events-auto rounded-full shadow-lg dark:shadow-black/50 shadow-gray-400/80"
                                    >
                                        <Avatar
                                            avatar={me}
                                            size={50}
                                            className="ring-[0.156rem] ring-orange-200 border-[0.0625rem] border-transparent"
                                        />
                                    </Link>

                                    {/* Navigation bar */}
                                    <NavigationBar
                                        isCategoryOpen={isCategoryMenuOpen}
                                        setIsCategoryOpen={
                                            setIsCategoryMenuOpen
                                        }
                                        className={`shrink-0 ${
                                            navbarOpen
                                                ? "animate-header-show-down"
                                                : "absolute invisible"
                                        }`}
                                    />

                                    {/* MenuModal Open Button For Mobile view */}
                                    <button
                                        className={`${
                                            navbarOpen
                                                ? "absolute invisible"
                                                : "animate-header-show-down"
                                        } pointer-events-auto dark:shadow-black/35
                                    group ml-auto mr-5 flex items-center flex-nowrap shrink-0 dark:bg-default-5-dark bg-default-2
                                    shadow-lg border-[0.0625rem] border-slate-300 dark:border-default-18-dark ring-[0.025rem] ring-orange-300
                                    rounded-full h-fit py-2 text-sm px-4 font-medium text-default-14-dark dark:text-default-10`}
                                        onClick={() =>
                                            setIsMenuModalOpen(!isMenuModalOpen)
                                        }
                                    >
                                        Menu &#160;
                                        <ArrowDown
                                            className={`stroke-gray-500 relative top-[0.125rem] w-[0.813rem] ${
                                                isMenuModalOpen && "rotate-180"
                                            } transition-transform`}
                                        />
                                    </button>

                                    <DarkmodeToggleSwitch />
                                </header>
                            </div>,
                            document.body
                        )}
                </>
            )}
        </>
    );
};

export default Header;
