export default interface CommentInfo {
	id: string;
	content: string;
	uploaded_at: string;
	parent_comment_id: string | null;
	post_id: string;
	is_deleted: boolean;
	email: string;
}