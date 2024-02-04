export default interface PostInfo {
    id: string,
    title: string,
    content: string,
    uploaded_at: Date,
    edited_at: Date, // TODO: 백에서 받아오는 거 추가해야함
    category_id: number,
}