import { useEffect, useRef } from "react";

interface SidebarButtonProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
    show: string,
    className?: string,
    color: string
}

const SidebarButton: React.FC<SidebarButtonProps> = (props) => {
    const barRef1 = useRef<HTMLDivElement>(null);
    const barRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        toggleButton();
    }, [props.show]);

    const toggleButton = () => {
        if (props.show === "true") {
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
        if (props.show === "true") props.setShowSidebar("false");
        else props.setShowSidebar("true");
    };

    return (
        <button className={`${props.className}`} onClick={handleClicked}>
            <div ref={barRef1} className={`${props.color} w-[30px] h-[4px] transition duration-700 ease-in-out rounded-2xl mb-[8px]`}></div>
            <div ref={barRef2} className={`${props.color} w-[30px] h-[4px] transition duration-700 ease-in-out rounded-2xl`}></div>
        </button>
    )
}

export default SidebarButton;