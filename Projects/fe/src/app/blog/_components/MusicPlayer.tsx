import {
    initMusicState,
    selectCurrentIndex,
    selectForceMusicPlay,
    selectMusicList,
    setCurrentIndex,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setMusicList,
    setMusicTitle,
} from "@/_redux/musicSlice";
import { handleError, throwError, throwResponse } from "@/_utils/responses";
import { serverUrl } from "@/_utils/site";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface MusicPlayerProps {
    className: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    const dispatch = useDispatch();
    const forceMusicPlay = useSelector(selectForceMusicPlay);
    const musicList = useSelector(selectMusicList);
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
        if (musicList.length === 0) {
            fetch(`${serverUrl}/api/blog/music`, {
                method: "GET",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throwResponse(res);
                })
                .then((data: string[]) => {
                    if (!data) {
                        throwError("Music list is null or undefined");
                    }
                    if (data.length > 0) {
                        data.sort(() => Math.random() - 0.5);
                        dispatch(setMusicList(data));
                        audioRef.current!.setAttribute("src", data[curIdx]);
                        audioRef.current!.load();
                    }
                })
                .catch(handleError);
        }

        audioRef.current?.addEventListener("timeupdate", updateCurrentPlayTime);

        return () => {
            audioRef.current?.removeEventListener(
                "timeupdate",
                updateCurrentPlayTime
            );
            dispatch(initMusicState());
        };
    }, []);

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
        <audio
            id="music-player"
            ref={audioRef}
            controls
            onLoadedData={(e) => {
                dispatch(setDuration(e.currentTarget.duration));
                const st =
                    musicList[curIdx].indexOf("music/") + "music/".length;
                const en = musicList[curIdx].indexOf(".mp3");
                if (st !== -1 && en !== -1) {
                    const title = musicList[curIdx].substring(st, en);
                    dispatch(setMusicTitle(title));
                }
            }}
            onPause={() => dispatch(setIsPlaying(false))}
            onPlay={() => dispatch(setIsPlaying(true))}
            onEnded={() => {
                const nxtIdx = (curIdx + 1) % musicList.length;
                dispatch(setCurrentIndex(nxtIdx));
                audioRef.current!.setAttribute("src", musicList[nxtIdx]);
                audioRef.current!.load();
                audioRef.current!.play();
            }}
            className={`${className}`}
        >
            <source type="audio/mp3" />
        </audio>
    );
};

export default MusicPlayer;
