import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verificarTokenJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Pega o token do header Authorization

    if (!token) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const decoded = jwt.verify(token, secretKey);
        //req.user = decoded; // Armazena os dados decodificados no objeto req
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido." });
    }
};

export { verificarTokenJWT };
