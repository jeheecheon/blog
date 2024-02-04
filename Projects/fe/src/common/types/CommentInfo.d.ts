export default interface CommentInfo {
	id: string;
	content: string;
	uploaded_at: Date | string;
	parent_comment_id: string | undefined;
	post_id: string;
	is_deleted: boolean;
	email: string;

	// TODO: 추가
	avatar: string | null;
	likes: number
}