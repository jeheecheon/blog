interface ToggleSwitchProps {
    isOn: boolean;
    switchId?: string;
    buttonId?: string;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onClick, switchId, buttonId }) => {
    return (
        <div
            id={switchId}
            className="dark:bg-default-10-dark bg-default-3 border-stone-400 border-[1px]
            w-[44px] flex rounded-full px-[2px] h-fit"
            onClick={onClick}
        >
            <button id={buttonId} className={`inline-block rounded-full my-[2px] h-[15px] w-[15px] relative transition-transform
            bg-stone-500/85 dark:bg-default-9 ${isOn && 'translate-x-[23px]'}`}></button>
        </div>
    )
}

export default ToggleSwitch