import DbConnection from "../database/connection.js";
import { CryptPassword } from "../util/cryptPassword.js";

const index = async (req, res, next) => {
    try {
        const users = await DbConnection.user.findMany({
            where: {
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });
        if (users.length === 0)
            return res
                .status(404)
                .json({ message: "No Users Found!" });
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const show = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del user */
        const { id } = req.params;
        const userId = parseInt(id); // Convertir el id a número entero

        if (isNaN(userId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        const user = await DbConnection.user.findUnique({
            where: {
                deletedAt: null,
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: `User With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del user */
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const create = async (req, res, next) => {
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
        return res.status(201).json({
            name: user.name,
            email: user.email,
            roleId: user.roleId,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del user */
        const { id } = req.params;
        const userId = parseInt(id); // Convertir el id a número entero

        if (isNaN(userId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let user = await DbConnection.user.findUnique({
            where: {
                deletedAt: null,
                id: userId,
            },
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: `User With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del user */

        if (req.body.password) {
            if (req.body.password.length < 8)
                return res.status(400).json({
                    message: "Password must be at least 8 characters",
                });

            req.body.password = await CryptPassword.hashPassword(req.body.password);
        }

        user = await DbConnection.user.update({
            where: {
                deletedAt: null,
                id: userId,
            },
            data: {
                ...req.body,
            },
        });

        user = await DbConnection.user.findUnique({
            where: {
                deletedAt: null,
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });

        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const userDelete = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del user */
        const { id } = req.params;
        const userId = parseInt(id); // Convertir el id a número entero

        if (isNaN(userId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let user = await DbConnection.user.findUnique({
            where: {
                deletedAt: null,
                id: userId,
            },
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: `User With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del user */

        user = await DbConnection.user.update({
            where: {
                deletedAt: null,
                id: userId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        user = await DbConnection.user.findUnique({
            where: {
                deletedAt: null,
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const restore = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del user */
        const { id } = req.params;
        const userId = parseInt(id); // Convertir el id a número entero

        if (isNaN(userId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let user = await DbConnection.user.findUnique({
            where: {
                deletedAt: {
                    not: null,
                },
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: `User With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del user */

        user = await DbConnection.user.update({
            where: {
                deletedAt: {
                    not: null,
                },
                id: userId,
            },
            data: {
                deletedAt: null,
            },
        });

        user = await DbConnection.user.findUnique({
            where: {
                deletedAt: {
                    not: null,
                },
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del user */
        const { id } = req.params;
        const userId = parseInt(id); // Convertir el id a número entero

        if (isNaN(userId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let user = await DbConnection.user.findUnique({
            where: {
                deletedAt: {
                    not: null,
                },
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: `User With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del user */

        user = await DbConnection.user.delete({
            where: {
                deletedAt: {
                    not: null,
                },
                id: userId,
            },
        });
        
        user = await DbConnection.user.findUnique({
            where: {
                deletedAt: {
                    not: null,
                },
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const seed = async (req, res, next) => {
    try {

        const usersData = [
            {
                name: "Admin",
                email: "admin@admin.com",
                password: await CryptPassword.hashPassword("12345678"),
                roleId: 1,
            },
            {
                name: "Veterinarian",
                email: "veterinarian@veterinarian.com",
                password: await CryptPassword.hashPassword("12345678"),
                roleId: 1,
            },
            {
                name: "Client",
                email: "client@client.com",
                password: await CryptPassword.hashPassword("12345678"),
                roleId: 1,
            },
        ];

        // Crear múltiples roles
        let users = await DbConnection.user.createMany({
            data: usersData,
        });

        // Obtener todos los roles que no están eliminados
        users = await DbConnection.user.findMany({
            where: {
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
            },
        });

        res.status(201).json({ users });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const UserController = {
    index,
    show,
    create,
    update,
    userDelete,
    restore,
    destroy,
    seed,
};
