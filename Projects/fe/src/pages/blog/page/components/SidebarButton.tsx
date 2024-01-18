import { useRef } from "react";

export const SidebarButton = () => {
    const barRef1 = useRef<HTMLDivElement>(null);
    const barRef2 = useRef<HTMLDivElement>(null);

    const handleClicked = () => {
        barRef1.current?.classList.toggle('rotate-45');
        barRef1.current?.classList.toggle('translate-y-[6px]');
        barRef2.current?.classList.toggle('-rotate-45');
        barRef2.current?.classList.toggle('-translate-y-[6px]');
    };

    return (
        <div className="inline-block cursor-pointer" onClick={handleClicked}>
            <div ref={barRef1} className="w-[30px] h-[4px] bg-slate-700 transition duration-700 ease-in-out rounded-2xl mb-[8px]"></div>
            <div ref={barRef2} className="w-[30px] h-[4px] bg-slate-700 transition duration-700 ease-in-out rounded-2xl"></div>
        </div>
    )
}
