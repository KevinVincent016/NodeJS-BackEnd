import {Request, Response} from 'express';
import { UserInput, UserDocument} from '../models/user.module'
import userService from '../services/user.service'
import {UserExistError, NotAuthorizedError} from '../exceptions/index';

class UserController{

    public async create(req: Request, res: Response) {
        try {
            const user: UserDocument = await userService.create(req.body as UserInput, req.body.loggedUserRole);
            res.status(201).json(user); 
        } catch (error) {
            if(error instanceof UserExistError){
                res.status(404).json({message:`User with email ${req.body.email} already exists`})
                return
            }
            res.status(500).json(error);
        }
        
    }

    public async login(req: Request, res: Response) {
        try {
            const userObj = await userService.login(req.body);
            res.status(200).json(userObj); 
        } catch (error) {
            if(error instanceof NotAuthorizedError){
                res.status(400).json({message:`Not Authorized`})
                return
            }
            res.status(500).json(error);
        }
        
    }

    public async update(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.update(req.params.uptId, req.body as UserInput)
            if(!user)
                res.status(404).json({error:"not found", message:`User with id ${req.params.uptId} was not found`})
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id)
            if(!user)
                res.status(404).json({error:"not found", message:`User with id ${req.params.id} was not found`})
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getUserByEmail(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findByEmail(req.params.email)
            if(!user)
                res.status(404).json({error:"not found", message:`User with id ${req.params.id} was not found`})
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.findAll()
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.deleteById(req.params.delId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default new UserController();