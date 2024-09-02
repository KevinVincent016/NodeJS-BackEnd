import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserExistError, NotAuthorizedError} from '../exceptions/index';
import UserModel, { UserDocument, UserInput } from "../models/user.module";

class UserService{

    public async create(userInput: UserInput, loggedUserRole: string): Promise<UserDocument> {
        if (loggedUserRole !== 'superadmin' && userInput.rol === 'superadmin') {
            throw new Error('Only a superadmin can create another superadmin');
        }
        
        try {
            const userExist = await this.findByEmail(userInput.email)
            if(userExist){
                throw new UserExistError(`User already exists`);
            }else{
                userInput.password = await bcrypt.hash(userInput.password, 10)
                try {
                    const user: UserDocument = await UserModel.create(userInput);
                    return user;   
                } catch (error) {
                    throw error;
                }
            }
        } catch (error) {
            throw error;
        }
        
    }

    public async login(userInput: any) {
        try {
            const userExist = await this.findByEmail(userInput.email)
            if(userExist){
                const isMatch:boolean = await bcrypt.compare(userInput.password, userExist.password)
                if(!isMatch)
                    throw new NotAuthorizedError('Not authorized')
                const token = this.generateToken(userExist)
                return {email: userExist.email, name: userExist.name, token: token};
            }else{
                throw new NotAuthorizedError('Not authorized')
            }
        } catch (error) {
            throw error;
        }
        
    }

    public async findAll(): Promise<UserDocument[]>{
        try {
            const users: UserDocument[] = await UserModel.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<UserDocument | null>{
        try {
            const user: UserDocument | null = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null>{
        try {
            const user: UserDocument | null = await UserModel.findOne({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findByIdAndUpdate(id, userInput, {returnOriginal: false});
            return user;   
        } catch (error) {
            throw error;
        }
    }

    public async deleteById(id: string): Promise<UserDocument | null>{
        try {
            const user: UserDocument | null = await UserModel.findByIdAndDelete(id, {returnOriginal: false});
            return user;
        } catch (error) {
            throw error;
        }
    }

    private generateToken(user: UserDocument): string {
        try {
            return jwt.sign({user_id: user._id, email: user.email, name:user.name, role: user.rol}, process.env.JWT_SECRET || "secret", {expiresIn: "5m"})
        } catch (error) {
            throw error;
        }
    }



}

export default new UserService();