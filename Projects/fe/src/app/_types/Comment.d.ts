export default interface CommentInfo {
	ParentCommentId: string | undefined;
	Content: React.Node;
	UploadedAt: string;
	IsDeleted: boolean;
	LikeCnt: number;
	HasLiked: boolean;
	Id: string;
	Email: string;
	Avatar: string | null;
	depth: number;
}