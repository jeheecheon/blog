import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/blog/_components/Avatar";
import me from "@/_assets/images/me.png";
import { useLocation } from "react-router-dom";

import MenuModal from "@/blog/_components/MenuModal";
import { Link } from "react-router-dom";
import DarkmodeToggleSwitch from "./DarkmodeToggleSwitch";
import ArrowDown from "@/blog/_assets/images/arrow-down.svg?react";
import NavigationBar from "./NavigationBar";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const prevScrollY = useRef<number>(0);
    const [headerTop, setHeaderTop] = useState<number>(0);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
        useState<boolean>(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

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

        let tempHeaderTop: number = 0;
        if (window.scrollY > 200) {
            if (window.scrollY > prevScrollY.current) {
                // down
                const topDiff = window.scrollY - prevScrollY.current;
                tempHeaderTop = headerTop - topDiff;
                if (tempHeaderTop < -120) tempHeaderTop = -120;
            } else {
                const topDiff = prevScrollY.current - window.scrollY;
                tempHeaderTop = headerTop + topDiff;
                if (tempHeaderTop > 0) tempHeaderTop = 0;
            }
        }

        setHeaderTop(tempHeaderTop);
        prevScrollY.current = window.scrollY;
        if (headerRef.current) {
            headerRef.current.style.top = `${tempHeaderTop}px`;
        }
    };

    return (
        <>
            <MenuModal
                isOpen={isMenuModalOpen}
                setIsOpen={setIsMenuModalOpen}
            />

            <header
                ref={headerRef}
                className="fixed top-0 left-0 mt-[13px] w-[100%] z-30 pointer-events-none"
            >
                <div
                    className="max-w-[1050px] sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto px-3 md:px-10
                    flex items-center justify-between"
                >
                    <Link to="/blog" className="pointer-events-auto rounded-full shadow-lg dark:shadow-black/50 shadow-gray-400/80">
                        <Avatar
                            avatar={me}
                            size={50}
                            className="ring-[2.5px] ring-orange-200 border-[1px] border-transparent"
                        />
                    </Link>

                    {/* MenuModal Open Button For Mobile view */}
                    <button
                        className="md:hidden pointer-events-auto overflow-visible dark:shadow-black/35
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
                        className="hidden md:flex"
                    />

                    <DarkmodeToggleSwitch />
                </div>
            </header>
        </>
    );
};

export default Header;
