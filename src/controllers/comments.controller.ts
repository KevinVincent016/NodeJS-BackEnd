import { Request, Response } from 'express';
import commentService from '../services/comment.service';
import { CommentInput } from '../models/comment.module';

class CommentController {
    public async create(req: Request, res: Response) {
        try {
            const commentInput: CommentInput = {
                content: req.body.content,
                author: req.body.loggedUser._id,
                parentComment: req.body.parentComment,
            };
            const comment = await commentService.create(commentInput);
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const comment = await commentService.update(req.params.id, { content: req.body.content });
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const comment = await commentService.deleteById(req.params.id);
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const comment = await commentService.findById(req.params.id);
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getByAuthor(req: Request, res: Response) {
        try {
            const comments = await commentService.findByAuthor(req.params.authorId);
            res.json(comments);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new CommentController();
