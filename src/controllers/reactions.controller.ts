import { Request, Response } from 'express';
import reactionService from '../services/reaction.service';
import { ReactionInput } from '../models/comment.module';
import { error } from 'console';

class ReactionController {
    public async create(req: Request, res: Response) {
        try {
            const { commentId, type } = req.body;
            const authorId = req.body.loggedUser.user_id;
            
            const reactionInput: ReactionInput = {
                author: authorId,
                type
            };

            const comment = await reactionService.create(commentId, reactionInput);
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { commentId, type } = req.body;
            const reactionId = req.params.recId;
            const authorId = req.body.loggedUser.user_id;

            console.log("............");
            console.log(commentId);
            console.log("............");
            console.log(reactionId);
            console.log("............");
            console.log(authorId);

            const comment = await reactionService.update(commentId, authorId, type, reactionId);
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId;
            const reactionId = req.params.recId;
            const authorId = req.body.loggedUser.user_id;

            console.log("............");
            console.log(commentId);
            console.log("............");
            console.log(reactionId);
            console.log("............");
            console.log(authorId);

            const comment = await reactionService.deleteById(commentId, reactionId, authorId);
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getReactionsByCommentId(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId;
            const reactions = await reactionService.findByCommentId(commentId);
            if (!reactions) {
                return res.status(404).json({ message: 'No reactions found for this comment' });
            }
            res.json(reactions);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new ReactionController();
