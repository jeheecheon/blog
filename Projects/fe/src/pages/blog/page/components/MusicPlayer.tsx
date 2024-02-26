import { Throw500Response } from '@/common/utils/responses';
import { useCallback, useEffect, useRef, useState } from 'react'

interface MusicPlayerProps {
    className: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [musicList, setMusicList] = useState<string[]>([]);
    const curIdx = useRef<number>(0);

    const playMusic = useCallback(() => {
        if (!isPlaying) {
            audioRef.current!.play();
            setIsPlaying(!isPlaying);
        }
    }, []);

    useEffect(() => {
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
                    setMusicList(json);
                    audioRef.current!.load();
                }
            })
            .catch((err) => console.error(err))

        window.addEventListener("click", playMusic)
        return () => {
            window.removeEventListener("click", playMusic)
        };
    }, []);

    const playNextTrack = () => {
        curIdx.current = ((curIdx.current + 1) % musicList.length);
        audioRef.current!.setAttribute("src", musicList[curIdx.current]);
        audioRef.current!.pause();
        audioRef.current!.load();
        audioRef.current!.play();
    };

    const handleEnded = () => {
        playNextTrack();
    };

    return (
        // process.env.NODE_ENV === 'production' &&
        <audio ref={audioRef} controls onEnded={handleEnded}
            className={`${className}`}
        >
            <source src={musicList[curIdx.current]} type="audio/mp3" />
        </audio>
    )
}

export default MusicPlayer