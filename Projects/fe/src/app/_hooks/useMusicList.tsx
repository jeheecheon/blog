import { throwError, throwResponse } from "@/_utils/responses";
import { useQuery } from "@tanstack/react-query";

const getMusicList = async () => {
    return await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blog/music`)
        .then((res) => {
            if (!res.ok) throwResponse(res);
            return res.json();
        })
        .then((musicList: string[]) => {
            if (!musicList)
                throwError("Music list is empty or null or undefined");

            if (!!musicList) musicList.sort(() => Math.random() - 0.5);
            
            return musicList;
        });
};

const useMusicList = () => {
    return useQuery({
        queryKey: ["musicList"],
        queryFn: getMusicList,
        staleTime: 1000 * 60 * 60 * 24 * 7,
        gcTime: 1000 * 60 * 60 * 24 * 7,
    });
};

export default useMusicList;
