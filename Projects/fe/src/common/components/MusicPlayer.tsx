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

    const autoPlayMusic = useCallback((e: MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement && targetElement.id !== 'music-toggle-switch') {
            if (!hasInteraction)
                setHasInteraction(true);
            if (!isPlaying && forceMusicPlay) {
                audioRef.current!.play();
                dispatch(setIsPlaying(true));
            }
        }
    }, []);

    useEffect(() => {
        if (musicList.length > 0) {
            const st = musicList[curIdx].indexOf("music/") + "music/".length;
            const en = musicList[curIdx].indexOf(".mp3");
            if (st !== -1 && en !== -1) {
                const title = musicList[curIdx].substring(st, en);
                dispatch(setMusicTitle(title));
            }
        }
    }, [musicList.length, curIdx])

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

        window.addEventListener("click", autoPlayMusic)
        audioRef.current?.addEventListener('timeupdate', (e: Event) => {
            const targetElement = e.target as HTMLAudioElement;
            dispatch(setCurrentTime(targetElement.currentTime))
        })
        return () => {
            window.removeEventListener("click", autoPlayMusic)
        };
    }, [musicList]);

    useEffect(() => {
        if (isPlaying === true) {
            const targetElement = audioRef.current as HTMLAudioElement;
            dispatch(setDuration(targetElement.duration));
        }
    }, [isPlaying, curIdx]);

    const playNextTrack = () => {
        const nxtIdx = ((curIdx + 1) % musicList.length)
        dispatch(setCurrentIndex(nxtIdx));
        audioRef.current!.setAttribute("src", musicList[nxtIdx]);
        dispatch(setIsPlaying(false));
        audioRef.current!.pause();
        audioRef.current!.load();
        dispatch(setIsPlaying(true))
        audioRef.current!.play();
    };

    const handleEnded = () => {
        playNextTrack();
    };

    return (
        // process.env.NODE_ENV === 'production' &&
        <audio
            id='music-player'
            ref={audioRef}
            controls
            onEnded={handleEnded}
            className={`${className}`}
        >
            <source src={musicList[curIdx]} type="audio/mp3" />
        </audio>
    )
}

export default MusicPlayer