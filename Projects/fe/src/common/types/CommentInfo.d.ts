export default interface CommentInfo {
	id: string,
	parent_comment_id: string
	account_id?: string,
	post_id?: string,
	content: string,
	uploaded_at?: string,
	edited_at?: string,
	is_deleted: boolean
}