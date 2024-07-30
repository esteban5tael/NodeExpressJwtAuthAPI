import DbConnection from "../database/connection.js";
import { CryptPassword } from "../util/cryptPassword.js";
import { TokenUtil } from "../util/tokenUtil.js";

const register = async (req, res, next) => {
    try {
        /* validar campos en el body */
        const { name, email, password, roleId } = req.body;
        if (!name || !email || !password || !roleId)
            return res.status(400).json({
                message:
                    "Name, Email, Password and RoleId Are Required",
            });
        if (password.length < 8)
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        /* validar campos en el body */

        const user = await DbConnection.user.create({
            data: {
                name,
                email,
                password: await CryptPassword.hashPassword(password),
                roleId,
            },
        });

        const token = TokenUtil.generateToken(user);

        return res.status(201).json({
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            token,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        /* validar campos en el body */
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                message: " Bad Credentials",
            });
        if (password.length < 8)
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        /* validar campos en el body */

        const user = await DbConnection.user.findUnique({
            where: {
                email,
                deletedAt: null,
            },
        });

        if (!user)
            return res.status(400).json({
                message: "Bad Credentials",
            });

        if (
            !(await CryptPassword.comparePassword(
                password,
                user.password
            ))
        )
            return res
                .status(400)
                .json({ message: "Bad Credentials" });

        const token = TokenUtil.generateToken(user);

        return res.status(200).json({
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            token,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const profile = async (req, res, next) => {
    try {
        const { email } = req;

        if (!email)
            return res.status(401).json({ message: "Unauthorized" });

        const user=await DbConnection.user.findUnique({
            where:{
                email,
                deletedAt:null
            }
        });

        if (!user)
            return res.status(401).json({ message: "Unauthorized" });


        res.status(200).json({user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const AuthController = {
    register,
    login,
    profile,
};
