export default interface CommentInfo {
	parent_comment_id: string | undefined;
	content: string;
	uploaded_at: Date | string;
	edited_at?: Date | string;
	is_deleted: boolean;
	like_cnt: number;
	has_liked: boolean;
	id: string;
	email: string;
	avatar: string | null;
}