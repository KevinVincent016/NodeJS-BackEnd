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

    public async findByAuthor(commentId: string, authorId: string): Promise<CommentDocument | null> {
        try {
            // Encuentra el comentario con una reacción específica por autor
            return await CommentModel.findOne({
                _id: commentId,
                'reactions.author': authorId
            });
        } catch (error) {
            throw error;
        }
    }

    public async update(commentId: string, authorId: string, reactionType: string): Promise<CommentDocument | null> {
        try {
            // Encuentra y actualiza el tipo de reacción de un autor específico
            const comment = await CommentModel.findOneAndUpdate(
                { _id: commentId, 'reactions.author': authorId },
                { $set: { 'reactions.$.type': reactionType } },
                { new: true }
            );
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(commentId: string, authorId: string): Promise<CommentDocument | null> {
        try {
            // Encuentra el comentario y elimina la reacción de un autor específico
            const comment = await CommentModel.findByIdAndUpdate(
                commentId,
                { $pull: { reactions: { author: authorId } } },
                { new: true }
            );
            return comment;
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();
