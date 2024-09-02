import { Request, Response } from 'express';
import reactionService from '../services/reaction.service';
import { ReactionInput } from '../models/comment.module';

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
            const authorId = req.body.loggedUser.user_id;

            const comment = await reactionService.update(commentId, authorId, type);
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { commentId } = req.body;
            const authorId = req.body.loggedUser.user_id;

            const comment = await reactionService.deleteById(commentId, authorId);
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getByAuthor(req: Request, res: Response) {
        try {
            const { commentId } = req.params;
            const authorId = req.body.loggedUser.user_id;

            const comment = await reactionService.findByAuthor(commentId, authorId);
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new ReactionController();
