import CancelButton from "@/_assets/images/cancel.svg?react";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CustomModalProps {
    onClose: () => void;
    isOpen: boolean;
    children: ReactNode;
    className?: string;
}

const CustomModal = ({
    onClose,
    children,
    isOpen,
    className,
}: CustomModalProps) => {
    const modalOverlayRef = useRef<HTMLDivElement>(null);

    function handleClose() {
        onClose();
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (target.classList.contains("modal-overlay")) {
                onClose();
            }
        }

        function handleScroll() {
            onClose();
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
            modalOverlayRef.current?.classList.remove("invisible");
        } else {
            setTimeout(() => {
                modalOverlayRef.current?.classList.add("invisible");
            }, 1000);
        }
    }, [isOpen]);

    return createPortal(
        <div
            ref={modalOverlayRef}
            className={`modal-overlay fixed top-0 left-0 w-full h-[100svh] bg-gray-800/35
            flex justify-center items-center transition-all duration-500 z-[30]
            ${isOpen ? "opacity-100 " : "opacity-0 pointer-events-none"}`}
        >
            <div
                className={`flex flex-col border-[0.125rem] rounded-[1.375rem] p-4
                border-[rgb(230,230,240)] dark:border-[rgb(29,29,32)] bg-[rgb(250,250,250)] dark:bg-[rgb(24,24,27)]
                ${
                    isOpen ? "pointer-events-auto" : "pointer-events-none"
                } ${className}`}
            >
                <button
                    onClick={handleClose}
                    className="absolute self-end h-7 w-7 text-default-10-dark"
                >
                    <CancelButton />
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
};

export default CustomModal;
