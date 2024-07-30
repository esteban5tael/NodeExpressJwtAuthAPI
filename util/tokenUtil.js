import "dotenv/config";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET || "secret";
        const token = jwt.sign(
            {
                email: user.email,
                roleId: user.roleId,
            },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const TokenUtil = {
    generateToken,
};
