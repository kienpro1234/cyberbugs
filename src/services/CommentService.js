import { BaseService } from "./baseService";

class CommentService extends BaseService{
    insertComment = (data) => {
        return this.post("Comment/insertComment", data)
    }
}

export const commentService = new CommentService();