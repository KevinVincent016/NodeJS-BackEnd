import mongoose from 'mongoose';

export interface ReactionInput {
    author: mongoose.Schema.Types.ObjectId;
    type: string;
}

export interface CommentInput {
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    parentComment?: mongoose.Schema.Types.ObjectId;
    reactions?: ReactionInput[];
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const reactionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
}, { timestamps: true });

const commentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        reactions: { type: [reactionSchema], default: [] },
    },
    { timestamps: true, collection: 'comments' }
);

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
