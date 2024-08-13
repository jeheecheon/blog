import { PostInfo, PostSummary } from "@/_types/Post";
import React from "react";

export const createSlug = (title: string) => {
    return title
        .toLowerCase() // 모든 문자를 소문자로 변환
        .replace(/[^\w\sㄱ-힣]/g, "") // 알파벳 문자(a-z), 숫자(0-9), 공백, 한글만 허용하고, 특수 문자는 제거
        .trim() // 문자열 양쪽의 공백 제거
        .replace(/\s+/g, "-") // 단어 사이에 하이픈(-) 추가하여 각 단어를 구분
        .replace(/-+/g, "-");
};

export const sortPostsByUploadedAt = (posts: PostInfo[] | PostSummary[]) => {
    // Sort posts by descending order of UploadedAt date
    posts.sort(
        (a, b) =>
            new Date(b.UploadedAt).getTime() - new Date(a.UploadedAt).getTime()
    );
    return posts;
};

export function extractTextFromTags(children: React.ReactNode): string {
    let content = "";

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            if (Array.isArray(child.props.children)) {
                content +=
                    (content.length > 0 ? " " : "") +
                    extractTextFromTags(child.props.children);
            } else if (typeof child.props.children === "string") {
                content +=
                    (content.length > 0 ? " " : "") + child.props.children;
            }
        } else if (typeof child === "string") {
            content += (content.length > 0 ? " " : "") + child;
        }
    });

    return content;
}
