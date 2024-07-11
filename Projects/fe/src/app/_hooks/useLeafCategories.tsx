import CategoryInfo from "@/_types/Category";
import { throwError, throwResponse } from "@/_utils/responses";
import { useQuery } from "@tanstack/react-query";

const getLeafCategories = async () => {
    return await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/categories/leaf`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
        }
    )
        .then((res) => {
            if (!res.ok) throwResponse(res);
            return res.json();
        })
        .then((leafCategories: CategoryInfo[]) => {
            if (!leafCategories && !Array.isArray(leafCategories))
                throwError("Leaf categories are null or undefined");
            return leafCategories;
        });
};

const useLeafCategories = () => {
    const query = useQuery({
        queryKey: ["leafCategories"],
        queryFn: getLeafCategories,
        staleTime: 1000 * 60 * 60 * 24 * 7,
        gcTime: 1000 * 60 * 60 * 24 * 7,
    });

    return { ...query, leafCategories: query.data ?? ([] as CategoryInfo[]) };
};

export default useLeafCategories;
