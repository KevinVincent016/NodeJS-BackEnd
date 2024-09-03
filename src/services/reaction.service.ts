import CommentModel, { CommentDocument, ReactionInput } from '../models/comment.module';

class ReactionService {

    public async create(commentId: string, reactionInput: ReactionInput): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findById(commentId);
            if (!comment) {
                throw new Error("Comment not found");
            }
    
            if (!comment.reactions) {
                comment.reactions = [];
            }
    
            comment.reactions.push(reactionInput);
            await comment.save();
            
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async findByCommentId(commentId: string): Promise<ReactionInput[] | null> {
        try {
            const comment = await CommentModel.findById(commentId).select('reactions').exec();
            if (!comment) {
                throw new Error("Comment not found");
            }
            
            return comment.reactions || null;
        } catch (error) {
            throw error;
        }
    }

    public async update(commentId: string, authorId: string, reactionType: string, reactionId: string): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findOneAndUpdate(
                {
                    _id: commentId,
                    reactions: { $elemMatch: { _id: reactionId, author: authorId } }
                },
                {
                    $set: { 'reactions.$.type': reactionType }
                },
                { new: true }
            );
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(commentId: string, reactionId: string, authorId: string): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findByIdAndUpdate(
                commentId,
                { $pull: { reactions: { _id: reactionId, author: authorId } } },
                { new: true }
            );
            return comment;
        } catch (error) {
            throw error;
        }
    }
    
}

export default new ReactionService();
