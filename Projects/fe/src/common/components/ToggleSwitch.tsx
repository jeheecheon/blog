interface ToggleSwitchProps {
    isOn: boolean;
    id?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onClick, id }) => {
    return (
        <button
            id={id}
            className="dark:bg-default-10-dark bg-default-4 border-stone-400 border-[1px]
            w-[44px] flex rounded-full px-[2px] h-fit"
            onClick={onClick}
        >
            <span className={`inline-block rounded-full my-[2px] h-[15px] w-[15px] relative transition-transform
            bg-stone-500 dark:bg-default-9 ${isOn && 'translate-x-[23px]'}`}></span>
        </button>
    )
}

export default ToggleSwitch