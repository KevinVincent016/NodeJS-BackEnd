import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const auth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined = req.headers.authorization;
        if(!token){
            res.status(401).json({message: "Not Authorized"})
        }else{
            token = token.replace("Bearer ", "");
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
            req.body.loggedUser = decoded;
            req.params.cId = req.params.id;
            req.params.id = decoded.user_id;
            req.body.loggedUserRole = decoded.role;
            console.log(req.body.loggedUser.user_id);
            console.log(req.params.delId);
            next()
        }
    } catch (error) {
        if(error instanceof TokenExpiredError){
            res.status(401).json({message: "Token Expired", error});
        }else{
            res.status(401).json({message: "Token Invalid", error});
        }
    }
}

export default auth;