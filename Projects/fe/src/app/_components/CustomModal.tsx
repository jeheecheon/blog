import CancelButton from "@/_assets/images/cancel.svg?react";
import { ReactNode, useEffect, useRef } from "react";

interface CustomModalProps {
    onClose: () => void;
    isOpen: boolean;
    children: ReactNode;
}

const CustomModal = ({ onClose, children, isOpen }: CustomModalProps) => {
    const modalOverlayRef = useRef<HTMLDivElement>(null);

    function handleClose() {
        onClose();
        setTimeout(() => {
            modalOverlayRef.current?.classList.add("absolute", "invisible");
        }, 1000);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (target.classList.contains("modal-overlay")) {
                handleClose();
            }
        }

        function handleScroll() {
            handleClose();
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            modalOverlayRef.current?.classList.remove("absolute", "invisible");
        }
    }, [isOpen]);

    return (
        <div
            ref={modalOverlayRef}
            className={`modal-overlay fixed top-0 left-0 w-full h-[100dvh] bg-gray-800/35 z-[30]
            flex justify-center items-center transition-all duration-1000 
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div
                className="flex flex-col border-[0.125rem] rounded-[1.375rem] p-4 pointer-events-auto
                border-[rgb(230,230,240)] dark:border-[rgb(29,29,32)] bg-[rgb(250,250,250)] dark:bg-[rgb(24,24,27)]"
            >
                <button
                    onClick={handleClose}
                    className="absolute self-end h-7 w-7 text-default-10-dark"
                >
                    <CancelButton />
                </button>

                {children}
            </div>
        </div>
    );
};

export default CustomModal;
