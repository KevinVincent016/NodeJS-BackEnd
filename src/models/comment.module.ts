import mongoose from 'mongoose';

export interface CommentInput {
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    parentComment?: mongoose.Schema.Types.ObjectId;
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const commentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    },
    { timestamps: true, collection: 'comments' }
);

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
