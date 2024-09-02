import express from 'express';
import ReactionController from '../controllers/reactions.controller';
import auth from '../middlewares/auth';

export const reactionRouter = express.Router();

reactionRouter.post('/', auth, ReactionController.create);
reactionRouter.put('/reactions', auth, ReactionController.update);
reactionRouter.delete('/:commentId/:recId', auth, ReactionController.delete);
reactionRouter.get('/reactions/:commentId', auth, ReactionController.getReactionsByCommentId);
