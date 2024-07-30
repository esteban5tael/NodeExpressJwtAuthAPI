import 'dotenv/config';
import jwt from "jsonwebtoken";

const profileMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token)
            return res.status(401).json({ message: "Unauthorized" });

        const JWT_SECRET = process.env.JWT_SECRET;

        token = token.split(" ")[1];

        const {email}=jwt.verify(token,JWT_SECRET);

        req.email=email;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default profileMiddleware;
