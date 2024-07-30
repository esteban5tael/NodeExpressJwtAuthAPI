import 'dotenv/config';
import jwt from "jsonwebtoken";
import DbConnection from '../database/connection.js';

const adminMiddleware =async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token)
            return res.status(401).json({ message: "Unauthorized" });

        const JWT_SECRET = process.env.JWT_SECRET;

        token = token.split(" ")[1];

        const {email}=jwt.verify(token,JWT_SECRET);

        const user=await DbConnection.user.findUnique({
            where:{
                email,
                deletedAt:null
            }
        });

        if (!user)
            return res.status(401).json({ message: "Unauthorized" });

        if(!user.roleId===1) return res.status(401).json({ message: "Unauthorized" });

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default adminMiddleware;
