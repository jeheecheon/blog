import PostInfo from "@/common/types/PostInfo"

export const convertStringDateIntoDate = (
    data: PostInfo[] | PostInfo
) => {
    if (Array.isArray(data)) {
        data.forEach(ele => {
            ele.uploaded_at = new Date(Date.parse(ele.uploaded_at.toString()))
            if (ele.edited_at !== undefined && ele.edited_at !== null)
                ele.edited_at = new Date(Date.parse(ele.edited_at.toString()))
        });
    }
    else {
        data.uploaded_at = new Date(Date.parse(data.uploaded_at.toString()))
        if (data.edited_at !== undefined && data.edited_at !== null)
            data.edited_at = new Date(Date.parse(data.edited_at.toString()))
    }
}