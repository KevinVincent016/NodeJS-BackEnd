import express from 'express';
import commentController from '../controllers/comments.controller';
import auth from '../middlewares/auth';

export const commentRouter = express.Router();

// Crear un comentario
commentRouter.post('/', auth, commentController.create);

// Actualizar un comentario
commentRouter.put('/:id', auth, commentController.update);

// Eliminar un comentario
commentRouter.delete('/:id', auth, commentController.delete);

// Obtener un comentario por ID
commentRouter.get('/:id', auth, commentController.getById);

// Obtener todos los comentarios de un autor
commentRouter.get('/author/:authorId', auth, commentController.getByAuthor);