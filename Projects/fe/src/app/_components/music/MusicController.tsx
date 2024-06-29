import {
    selectCurrentIndex,
    selectCurrentTime,
    selectDuration,
    selectForceMusicPlay,
    selectIsPlaying,
    selectMusicList,
    selectMusicTitle,
    setCurrentIndex,
    setForceMusicPlay,
} from "@/_redux/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "@/_components/ui/ToggleSwitch";
import { useEffect, useState } from "react";
import PrevButton from "@/_assets/images/prev.svg?react";
import PlayButton from "@/_assets/images/play.svg?react";
import PauseButton from "@/_assets/images/pause.svg?react";
import NextButton from "@/_assets/images/next.svg?react";

interface MusicControllerProps {
    className?: string;
}

const MusicController: React.FC<MusicControllerProps> = ({ className }) => {
    const forceMusicPlay = useSelector(selectForceMusicPlay);
    const musicTitle = useSelector(selectMusicTitle);
    const currentTime = useSelector(selectCurrentTime);
    const duration = useSelector(selectDuration);
    const isPlaying = useSelector(selectIsPlaying);
    const curIdx = useSelector(selectCurrentIndex);
    const musicList = useSelector(selectMusicList);
    const dispatch = useDispatch();

    const [playTimeMin, setPlayTimeMin] = useState<string>();
    const [playTimeSec, setPlayTimeSec] = useState<string>();
    const [durationMin, setDurationMin] = useState<string>();
    const [durationSec, setDurationSec] = useState<string>();

    useEffect(() => {
        const playtimeMinTemp = Math.floor(currentTime / 60);
        setPlayTimeMin(
            playtimeMinTemp.toString().length == 2
                ? playtimeMinTemp.toString()
                : "0" + playtimeMinTemp
        );

        const playtimeSecTemp = Math.floor(currentTime % 60);
        setPlayTimeSec(
            playtimeSecTemp.toString().length == 2
                ? playtimeSecTemp.toString()
                : "0" + playtimeSecTemp
        );
    }, [currentTime]);

    useEffect(() => {
        const durationMinTemp = Math.floor(duration / 60);
        setDurationMin(
            durationMinTemp.toString().length == 2
                ? durationMinTemp.toString()
                : "0" + durationMinTemp
        );

        const durationSecTemp = Math.floor(duration % 60);
        setDurationSec(
            durationSecTemp.toString().length == 2
                ? durationSecTemp.toString()
                : "0" + durationSecTemp
        );
    }, [duration]);

    const handlePlayClicked = () => {
        const audioRef = document.getElementById(
            "music-player"
        ) as HTMLAudioElement;
        if (audioRef && audioRef.id !== "music-toggle-switch") {
            audioRef.play();
        }
    };

    const handlePauseClicked = () => {
        const audioRef = document.getElementById(
            "music-player"
        ) as HTMLAudioElement;
        if (audioRef && audioRef.id !== "music-toggle-switch") {
            const audioRef = document.getElementById(
                "music-player"
            ) as HTMLAudioElement;
            audioRef.pause();
        }
    };

    const handleNextClicked = () => {
        const nxtIdx = (curIdx + 1) % musicList.length;
        dispatch(setCurrentIndex(nxtIdx));

        const audioRef = document.getElementById(
            "music-player"
        ) as HTMLAudioElement;
        if (audioRef !== null && audioRef !== undefined) {
            audioRef.setAttribute("src", musicList[nxtIdx]);
            audioRef.pause();
            audioRef.load();
            audioRef.play();
        }
    };

    const handlePrevlicked = () => {
        const prvIdx = curIdx - 1 < 0 ? musicList.length - 1 : curIdx - 1;
        dispatch(setCurrentIndex(prvIdx));

        const audioRef = document.getElementById(
            "music-player"
        ) as HTMLAudioElement;

        if (audioRef !== null && audioRef !== undefined) {
            audioRef.setAttribute("src", musicList[prvIdx]);
            audioRef.pause();
            audioRef.load();
            audioRef.play();
        }
    };

    return (
        <div
            className={`flex flex-col justify-center items-center w-[15.625rem] ${className}`}
        >
            <div className="flex flex-col">
                <p className="text-sm text-nowrap text-stone-400 dark:text-default-18-dark ">
                    {`${playTimeMin}:${playTimeSec} / ${durationMin}:${durationSec}`}
                </p>
            </div>
            <div className="flex flex-row w-full items-center gap-3">
                <div className="mask-image overflow-x-hidden w-full">
                    <p
                        className="dark:text-default-18 text-default-18 text-sm
                        italic text-nowrap inline-block w-full -translate-x-[150 animate-infinite-x-scroll"
                    >
                        {musicTitle}
                    </p>
                </div>
            </div>
            <div className="fill-orange-400/65 dark:fill-orange-400/95  flex justify-between gap-3 mt-1">
                {/* Prev */}
                <button onClick={handlePrevlicked}>
                    <PrevButton />
                </button>

                {/* Play & Pause */}
                {isPlaying ? (
                    <button onClick={handlePauseClicked}>
                        <PauseButton />
                    </button>
                ) : (
                    <button onClick={handlePlayClicked}>
                        <PlayButton />
                    </button>
                )}

                {/* Next */}
                <button onClick={handleNextClicked}>
                    <NextButton />
                </button>
            </div>

            {/* Auto play toggle switch, 비활성화 상태 */}
            <div className="flex-row items-center justify-center gap-2 mt-[0.625rem] hidden">
                <div className="flex flex-col items-center">
                    <p className="text-[0.78125rem] text-stone-500 dark:text-default-13 font-semibold">
                        {forceMusicPlay ? "On" : "Off"}
                    </p>
                    <p className="text-[0.625rem] text-stone-500 dark:text-default-13 font-medium">
                        Auto Play
                    </p>
                </div>
                <ToggleSwitch
                    switchId="music-toggle-switch"
                    buttonId="music-toggle-switch-button"
                    isOn={forceMusicPlay}
                    onClick={() => dispatch(setForceMusicPlay(!forceMusicPlay))}
                />
            </div>
        </div>
    );
};

export default MusicController;
