export interface PostInfo {
    Id: string,
    Title: string,
    UploadedAt: Date,
    EditedAt?: Date,
    Cover?: string,
    CategoryId?: string,
    Content: string,
    CommentCnt: number,
    LikeCnt: number,
    HasLiked?: boolean
    IsPublic?: boolean
}

export interface PostSummary {
    Id: string,
    Title: string,
    UploadedAt: Date,
    EditedAt?: Date,
}