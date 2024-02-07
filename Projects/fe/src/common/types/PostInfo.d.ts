export default interface PostInfo {
    id: string,
    title: string,
    uploaded_at: Date,
    edited_at?: Date,
    cover?: string,
    category_id?: string,
    content: string,
    comment_cnt: number,
    like_cnt: number
}