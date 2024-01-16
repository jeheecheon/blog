import { useRef } from "react";

export const SidebarButton = () => {
    const barRef1 = useRef<HTMLDivElement>(null);
    const barRef2 = useRef<HTMLDivElement>(null);
    const barRef3 = useRef<HTMLDivElement>(null);

    const handleClicked = () => {
        barRef1.current?.classList.toggle('rotate-45');
        barRef1.current?.classList.toggle('translate-y-2');
        barRef2.current?.classList.toggle('hidden');
        barRef3.current?.classList.toggle('-rotate-45');
    };

    return (
        <div className="inline-block cursor-pointer" onClick={handleClicked}>
            <div ref={barRef1} className="w-[30px] h-[4px] bg-slate-800 mb-1 transition ease-in-out"></div>
            <div ref={barRef2} className="w-[30px] h-[4px] bg-slate-800 mb-1 transition ease-in-out"></div>
            <div ref={barRef3} className="w-[30px] h-[4px] bg-slate-800 transition ease-in-out"></div>
        </div>
    )
}
