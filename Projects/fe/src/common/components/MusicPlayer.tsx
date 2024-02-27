import { setCurrentIndex, setCurrentTime, setDuration, setIsPlaying, setMusicList, setMusicTitle } from '@/common/redux/musicSlice';
import { RootState } from '@/common/redux/store';
import { Throw500Response } from '@/common/utils/responses';
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface MusicPlayerProps {
    className: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    const dispatch = useDispatch();
    const forceMusicPlay = useSelector((state: RootState) => state.music.forceMusicPlay);
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying);
    const musicList = useSelector((state: RootState) => state.music.musicList);
    const curIdx = useSelector((state: RootState) => state.music.currentIndex);

    const [hasInteraction, setHasInteraction] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const autoPlayMusic = useCallback((targetElement: HTMLElement) => {
        if (targetElement && targetElement.id !== 'music-toggle-switch'
            && targetElement && targetElement.id !== 'music-play-button'
            && targetElement && targetElement.id !== 'music-pause-button') {
            if (!hasInteraction)
                setHasInteraction(true);
            if (!isPlaying && forceMusicPlay)
                audioRef.current!.play();
        }
    }, []);

    const autoPlayMusicOnClicked = useCallback((e: MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        autoPlayMusic(targetElement)
    }, []);

    const autoPlayMusicOnTouchstart = useCallback((e: TouchEvent) => {
        const targetElement = e.target as HTMLElement;
        autoPlayMusic(targetElement)
    }, []);

    const autoPlayMusicOnKeydown = useCallback((e: KeyboardEvent) => {
        const targetElement = e.target as HTMLElement;
        autoPlayMusic(targetElement)
    }, []);

    const updateCurrentPlayTime = useCallback((e: Event) => {
        const targetElement = e.target as HTMLAudioElement;
        dispatch(setCurrentTime(targetElement.currentTime))
    }, []);

    useEffect(() => {
        if (musicList.length === 0) {
            fetch("/api/blog/music/list")
                .then((res) => {
                    if (res.ok)
                        return res.json();
                    else
                        return null;
                })
                .then((json) => {
                    if (json === undefined || json === null)
                        Throw500Response();
                    else {
                        dispatch(setMusicList(json));
                        audioRef.current!.load();
                    }
                })
                .catch((err) => console.error(err))
        }

        window.addEventListener("click", autoPlayMusicOnClicked)
        window.addEventListener("keydown", autoPlayMusicOnKeydown)
        window.addEventListener("touchstart", autoPlayMusicOnTouchstart)
        audioRef.current?.addEventListener('timeupdate', updateCurrentPlayTime)
        return () => {
            window.removeEventListener("click", autoPlayMusicOnClicked)
            window.removeEventListener("keydown", autoPlayMusicOnKeydown)
            window.removeEventListener("touchstart", autoPlayMusicOnTouchstart)
            audioRef.current?.removeEventListener("timeupdate", updateCurrentPlayTime)
        };
    }, [musicList.length]);

    return (
        // process.env.NODE_ENV === 'production' &&
        <audio
            id='music-player'
            ref={audioRef}
            controls
            onLoadedData={(e) => {
                dispatch(setDuration(e.currentTarget.duration))
                const st = musicList[curIdx].indexOf("music/") + "music/".length;
                const en = musicList[curIdx].indexOf(".mp3");
                if (st !== -1 && en !== -1) {
                    const title = musicList[curIdx].substring(st, en);
                    dispatch(setMusicTitle(title));
                }
            }}
            onPause={() => dispatch(setIsPlaying(false))}
            onPlay={() => dispatch(setIsPlaying(true))}
            onEnded={() => {
                const nxtIdx = ((curIdx + 1) % musicList.length)
                dispatch(setCurrentIndex(nxtIdx));
                audioRef.current!.setAttribute("src", musicList[nxtIdx]);
                audioRef.current!.pause();
                audioRef.current!.load();
                audioRef.current!.play();
            }}
            className={`${className}`}
        >
            <source src={musicList[curIdx]} type="audio/mp3" />
        </audio >
    )
}

export default MusicPlayer