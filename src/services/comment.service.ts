import CommentModel, { CommentDocument, CommentInput } from '../models/comment.module';

class CommentService {
    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            const comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<CommentDocument | null> {
        try {
            return await CommentModel.findById(id).populate('author').exec();
        } catch (error) {
            throw error;
        }
    }

    public async findByAuthor(authorId: string): Promise<CommentDocument[]> {
        try {
            return await CommentModel.find({ author: authorId }).exec();
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, commentInput: Partial<CommentInput>): Promise<CommentDocument | null> {
        try {
            return await CommentModel.findByIdAndUpdate(id, commentInput, { new: true }).exec();
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(id: string): Promise<CommentDocument | null> {
        try {
            return await CommentModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw error;
        }
    }
}

export default new CommentService();
