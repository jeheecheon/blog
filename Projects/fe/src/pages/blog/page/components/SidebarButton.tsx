import { useEffect, useRef } from "react";

export const SidebarButton = ({ show, setShowSidebar, className }:
    {
        setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
        show: boolean,
        className?: string
    }) => {
    const barRef1 = useRef<HTMLDivElement>(null);
    const barRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        toggleButton();
    }, [show]);

    const toggleButton = () => {
        if (show === true) {
            barRef1.current?.classList.add('rotate-45');
            barRef1.current?.classList.add('translate-y-[6px]');
            barRef2.current?.classList.add('-rotate-45');
            barRef2.current?.classList.add('-translate-y-[6px]');

        }
        else {
            barRef1.current?.classList.remove('rotate-45');
            barRef1.current?.classList.remove('translate-y-[6px]');
            barRef2.current?.classList.remove('-rotate-45');
            barRef2.current?.classList.remove('-translate-y-[6px]');
        }
    }

    const handleClicked = () => {
        toggleButton();
        setShowSidebar(!show);
    };

    return (
        <div className={`inline-block cursor-pointer ${className}`} onClick={handleClicked}>
            <div ref={barRef1} className="w-[30px] h-[4px] bg-slate-700 transition duration-700 ease-in-out rounded-2xl mb-[8px]"></div>
            <div ref={barRef2} className="w-[30px] h-[4px] bg-slate-700 transition duration-700 ease-in-out rounded-2xl"></div>
        </div>
    )
}
