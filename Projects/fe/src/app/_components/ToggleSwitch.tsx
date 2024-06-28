interface ToggleSwitchProps {
    isOn: boolean;
    switchId?: string;
    buttonId?: string;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    isOn,
    onClick,
    switchId,
    buttonId,
}) => {
    return (
        <div
            id={switchId}
            className="dark:bg-default-10-dark bg-default-3 border-stone-400 border-[0.0625rem]
            w-[2.75rem] flex rounded-full px-[0.125rem] h-fit"
            onClick={onClick}
        >
            <button
                id={buttonId}
                className={`inline-block rounded-full my-[0.125rem] h-[0.9375rem] w-[0.9375rem] relative transition-transform
            bg-stone-500/85 dark:bg-default-9 ${
                isOn && "translate-x-[20.1875rem]"
            }`}
            ></button>
        </div>
    );
};

export default ToggleSwitch;
