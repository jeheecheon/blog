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

export const createSlug = (title: string) => {
    return title.toLowerCase()                  // 모든 문자를 소문자로 변환
        .replace(/[^\w\sㄱ-힣]/g, '')  // 알파벳 문자(a-z), 숫자(0-9), 공백, 한글만 허용하고, 특수 문자는 제거
        .trim()                         // 문자열 양쪽의 공백 제거
        .replace(/\s+/g, '-')           // 단어 사이에 하이픈(-) 추가하여 각 단어를 구분
        .replace(/-+/g, '-');
}