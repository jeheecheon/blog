import useMusicList from "@/_hooks/useMusicList";
import {
    initMusicState,
    selectCurrentIndex,
    selectForceMusicPlay,
    setCurrentIndex,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setMusicList,
    setMusicTitle,
} from "@/_redux/musicSlice";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface MusicPlayerProps {
    className: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    const dispatch = useDispatch();
    const forceMusicPlay = useSelector(selectForceMusicPlay);
    const musicList = useMusicList();
    const curIdx = useSelector(selectCurrentIndex);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Play music when the user interacts with the page
    const autoPlayMusic = useCallback((targetElement: HTMLElement) => {
        // Except for music toggle switch, music play button, and music pause button
        if (
            targetElement &&
            targetElement.id !== "music-toggle-switch" &&
            targetElement.id !== "music-toggle-switch-button" &&
            targetElement.id !== "music-play-button" &&
            targetElement.id !== "music-pause-button"
        ) {
            audioRef.current!.play();
        }
    }, []);

    const autoPlayMusicOnClicked = useCallback((e: MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        autoPlayMusic(targetElement);
    }, []);

    const autoPlayMusicOnTouchstarted = useCallback((e: TouchEvent) => {
        const targetElement = e.target as HTMLElement;
        autoPlayMusic(targetElement);
    }, []);

    const autoPlayMusicOnKeydowned = useCallback((e: KeyboardEvent) => {
        const targetElement = e.target as HTMLElement;
        autoPlayMusic(targetElement);
    }, []);

    const updateCurrentPlayTime = useCallback((e: Event) => {
        const targetElement = e.target as HTMLAudioElement;
        dispatch(setCurrentTime(targetElement.currentTime));
    }, []);

    useEffect(() => {
        if (musicList.isSuccess && !!musicList.data) {
            dispatch(setMusicList(musicList.data));
            audioRef.current!.setAttribute("src", musicList.data[curIdx]);
            audioRef.current!.load();
        }

        audioRef.current?.addEventListener("timeupdate", updateCurrentPlayTime);

        return () => {
            audioRef.current?.removeEventListener(
                "timeupdate",
                updateCurrentPlayTime
            );
            dispatch(initMusicState());
        };
    }, [musicList.isSuccess]);

    useEffect(() => {
        if (musicList.isError)
            dispatch(setMusicTitle("Failed to fetch music list..."));
    }, [musicList.isError]);

    useEffect(() => {
        if (forceMusicPlay) {
            window.addEventListener("click", autoPlayMusicOnClicked);
            window.addEventListener("keydown", autoPlayMusicOnKeydowned);
            window.addEventListener("touchstart", autoPlayMusicOnTouchstarted);
        } else {
            window.removeEventListener("click", autoPlayMusicOnClicked);
            window.removeEventListener("keydown", autoPlayMusicOnKeydowned);
            window.removeEventListener(
                "touchstart",
                autoPlayMusicOnTouchstarted
            );
        }

        return () => {
            window.removeEventListener("click", autoPlayMusicOnClicked);
            window.removeEventListener("keydown", autoPlayMusicOnKeydowned);
            window.removeEventListener(
                "touchstart",
                autoPlayMusicOnTouchstarted
            );
        };
    }, [forceMusicPlay]);

    return (
        musicList.isSuccess && (
            <audio
                id="music-player"
                ref={audioRef}
                controls
                onLoadedData={(e) => {
                    dispatch(setDuration(e.currentTarget.duration));
                    const st =
                        musicList.data[curIdx].indexOf("music/") +
                        "music/".length;
                    const en = musicList.data[curIdx].indexOf(".mp3");
                    if (st !== -1 && en !== -1) {
                        const title = musicList.data[curIdx].substring(st, en);
                        dispatch(setMusicTitle(title));
                    }
                }}
                onPause={() => dispatch(setIsPlaying(false))}
                onPlay={() => dispatch(setIsPlaying(true))}
                onEnded={() => {
                    const nxtIdx = (curIdx + 1) % musicList.data.length;
                    dispatch(setCurrentIndex(nxtIdx));
                    audioRef.current!.setAttribute(
                        "src",
                        musicList.data[nxtIdx]
                    );
                    audioRef.current!.load();
                    audioRef.current!.play();
                }}
                className={`${className}`}
            >
                <source type="audio/mp3" />
            </audio>
        )
    );
};

export default MusicPlayer;
