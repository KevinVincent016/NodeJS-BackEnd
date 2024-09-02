import { Request, Response } from 'express';
import commentService from '../services/comment.service';
import { CommentInput } from '../models/comment.module';
import userService from '../services/user.service';

class CommentController {
    public async create(req: Request, res: Response) {
        try {
            const commentInput: CommentInput = {
                content: req.body.content,
                author: req.body.loggedUser.user_id,
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
            const user = await userService.findById(req.body.loggedUser.user_id);
            const modComment = await commentService.findById(req.params.cId);

            console.log(user)
            console.log(modComment)

            if (!modComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            if (!user) {
                return res.status(404).json({ message: 'Author not found' });
            }

            if (modComment.author.toString() !== user.toString()) {
                return res.status(403).json({ message: "Forbidden: You don't have permission to modify this comment" });
            }

            const comment = await commentService.update(req.params.cId, { content: req.body.content });
            res.json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const user = await userService.findById(req.body.loggedUser.user_id);
            const modComment = await commentService.findById(req.params.cId);

            console.log(user)
            console.log(modComment)

            if (!modComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            if (!user) {
                return res.status(404).json({ message: 'Author not found' });
            }

            if (modComment.author.toString() !== user.toString()) {
                return res.status(403).json({ message: "Forbidden: You don't have permission to delete this comment" });
            }

            const comment = await commentService.deleteById(req.params.cId);
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const comment = await commentService.findById(req.params.cId);
            console.log(req.params.id);
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

    public async getByComment(req: Request, res: Response){
        try{
            const comments = await commentService.findByComment(req.params.cId);
            res.json(comments);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new CommentController();
