import express, {Request, Response} from 'express';

import usersController from '../controllers/users.controller';
import validateSchema from '../middlewares/validateSchema';
import userSchema from '../schemas/user.schema';
import auth from '../middlewares/auth';
import validateRol from '../middlewares/validateRol';

export const router = express.Router();
//Crear usuario
router.post('/', auth, validateRol(['superadmin']), validateSchema(userSchema), usersController.create);

//Login
router.post('/login', usersController.login);

//Obtener todos los usuarios
router.get('/', auth, usersController.getAll);

//Obtener informacion del usuario logeado
router.get('/profile', auth, usersController.getUser);

//Obtener usuario por ID
router.get('/:id', usersController.getUser);

//¿?
router.get('/:id/group/:groupId', (req: Request, res: Response) => {
    res.send(`get user with id ${req.params.id} and group id ${req.params.groupId}`);
});

//Actualizar la informacion de un usuario
router.put('/:uptId', auth, validateRol(['superadmin']), usersController.update);

//Eliminar un usuario
router.delete('/:delId', auth, validateRol(['superadmin']), usersController.delete);