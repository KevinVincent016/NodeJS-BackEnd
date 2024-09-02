import { Request, Response, NextFunction } from "express";

const validateRol = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("Roles Permitidos:", roles);
        console.log("Rol del Usuario Logueado:", req.body.loggedUserRole);
        
        if (!roles.includes(req.body.loggedUserRole)) {
            return res.status(403).json({ message: "Forbidden: You don't have enough permissions" });
        }
        next();
    }
}

export default validateRol;