import { RootState } from "@/common/redux/store";
import { setCurrentIndex, setForceMusicPlay } from "@/common/redux/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import ToggleSwitch from "@/common/components/ToggleSwitch";
import { useEffect, useState } from "react";

interface MusicControllerProps {
    className?: string
}

const MusicController: React.FC<MusicControllerProps> = ({ className }) => {
    const forceMusicPlay = useSelector((state: RootState) => state.music.forceMusicPlay);
    const musicTitle = useSelector((state: RootState) => state.music.musicTitle);
    const currentTime = useSelector((state: RootState) => state.music.currentTime);
    const duration = useSelector((state: RootState) => state.music.duration);
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying);
    const curIdx = useSelector((state: RootState) => state.music.currentIndex);
    const musicList = useSelector((state: RootState) => state.music.musicList);
    const dispatch = useDispatch();

    const [playTimeMin, setPlayTimeMin] = useState<string>();
    const [playTimeSec, setPlayTimeSec] = useState<string>();
    const [durationMin, setDurationMin] = useState<string>();
    const [durationSec, setDurationSec] = useState<string>();

    useEffect(() => {
        const playtimeMinTemp = Math.floor(currentTime / 60);
        setPlayTimeMin(playtimeMinTemp.toString().length == 2
            ? playtimeMinTemp.toString()
            : '0' + playtimeMinTemp);

        const playtimeSecTemp = Math.floor(currentTime % 60);
        setPlayTimeSec(playtimeSecTemp.toString().length == 2
            ? playtimeSecTemp.toString()
            : '0' + playtimeSecTemp);
    }, [currentTime]);

    useEffect(() => {
        const durationMinTemp = Math.floor(duration / 60);
        setDurationMin(durationMinTemp.toString().length == 2
            ? durationMinTemp.toString()
            : '0' + durationMinTemp);

        const durationSecTemp = Math.floor(duration % 60);
        setDurationSec(durationSecTemp.toString().length == 2
            ? durationSecTemp.toString()
            : '0' + durationSecTemp);
    }, [duration]);

    const handlePlayClicked = () => {
        const audioRef = document.getElementById("music-player") as HTMLAudioElement;
        if (audioRef && audioRef.id !== 'music-toggle-switch') {
            audioRef.play();
        }
    }

    const handlePauseClicked = () => {
        const audioRef = document.getElementById("music-player") as HTMLAudioElement;
        if (audioRef && audioRef.id !== 'music-toggle-switch') {
            const audioRef = document.getElementById("music-player") as HTMLAudioElement;
            audioRef.pause();
        }
    }

    const handleNextClicked = () => {
        const nxtIdx = ((curIdx + 1) % musicList.length)
        dispatch(setCurrentIndex(nxtIdx));

        const audioRef = document.getElementById("music-player") as HTMLAudioElement;
        if (audioRef !== null && audioRef !== undefined) {
            audioRef.setAttribute("src", musicList[nxtIdx]);
            audioRef.pause();
            audioRef.load();
            audioRef.play();
        }
    }

    const handlePrevlicked = () => {
        const prvIdx = ((curIdx - 1) < 0 ? musicList.length - 1 : curIdx - 1);
        dispatch(setCurrentIndex(prvIdx));

        const audioRef = document.getElementById("music-player") as HTMLAudioElement;
        audioRef.volume
        if (audioRef !== null && audioRef !== undefined) {
            audioRef.setAttribute("src", musicList[prvIdx]);
            audioRef.pause();
            audioRef.load();
            audioRef.play();
        }
    }

    return (
        <div className={`flex flex-col justify-center items-center w-[250px] ${className}`}>

            <div className="flex flex-col">
                <p className="text-sm text-nowrap text-stone-400 dark:text-default-18-dark ">
                    {`${playTimeMin}:${playTimeSec} / ${durationMin}:${durationSec}`}
                </p>
            </div>
            <div className="flex flex-row w-full items-center gap-3">
                <div className="mask-image overflow-x-hidden w-full">
                    <p className="dark:text-default-11 text-stone-500
                    italic text-nowrap inline-block w-full -translate-x-[150 animate-infinite-x-scroll"
                    >
                        {musicTitle}
                    </p>
                </div>

            </div>
            <div className="fill-stone-500 gap-3 dark:fill-default-13 flex justify-between">
                {/* Prev */}
                <button
                    onClick={handlePrevlicked}>
                    <svg className="" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z" /></svg>
                </button>
                
                {/* Play & Pause */}
                {
                    isPlaying
                        ? <svg className="cursor-pointer block w-full h-full" onClick={handlePauseClicked} id="music-pause-button" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path className="pointer-events-none" d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" /></svg>
                        : <svg className="cursor-pointer block w-full h-full" onClick={handlePlayClicked} id="music-play-button" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path className="pointer-events-none" d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></svg>
                }

                {/* Next */}
                <button
                    onClick={handleNextClicked}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z" /></svg>
                </button>
            </div>

            <div className="flex flex-row items-center justify-center gap-2 mt-[10px]">
                <div className="flex flex-col items-center text-stone-500 dark:text-default-13">
                    <p className="text-[11px]">
                        Auto Play
                    </p>
                    <p className="text-[12px]">
                        {forceMusicPlay ? "\"ON\"" : "\"OFF\""}
                    </p>
                </div>
                <ToggleSwitch
                    switchId="music-toggle-switch"
                    buttonId="music-toggle-switch-button"
                    isOn={forceMusicPlay}
                    onClick={() => dispatch(setForceMusicPlay(!forceMusicPlay))}
                />
            </div>

        </div >
    )
}

export default MusicController