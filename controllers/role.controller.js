import DbConnection from "../database/connection.js";

const index = async (req, res, next) => {
    try {
        const roles = await DbConnection.role.findMany({
            where: {
                deletedAt: null,
            },
        });
        if (roles.length === 0)
            return res
                .status(404)
                .json({ message: "No Roles Found!" });
        return res.status(200).json({ roles });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const show = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del role */
        const { id } = req.params;
        const roleId = parseInt(id); // Convertir el id a número entero

        if (isNaN(roleId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        const role = await DbConnection.role.findUnique({
            where: {
                deletedAt: null,
                id: roleId,
            },
        });

        if (!role) {
            return res
                .status(404)
                .json({ message: `Role With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del role */
        return res.status(200).json({ role });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        /* validar campos en el body */
        const { name, description } = req.body;
        if (!name || !description)
            return res.status(400).json({
                message: "Name and Description Are Required!",
            });
        /* validar campos en el body */

        const role = await DbConnection.role.create({
            data: {
                name,
                description,
            },
        });
        return res.status(201).json({ role });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del role */
        const { id } = req.params;
        const roleId = parseInt(id); // Convertir el id a número entero

        if (isNaN(roleId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let role = await DbConnection.role.findUnique({
            where: {
                deletedAt: null,
                id: roleId,
            },
        });

        if (!role) {
            return res
                .status(404)
                .json({ message: `Role With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del role */

        role = await DbConnection.role.update({
            where: {
                deletedAt: null,
                id: roleId,
            },
            data: {
                ...req.body,
            },
        });

        return res.status(200).json({ role });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const roleDelete = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del role */
        const { id } = req.params;
        const roleId = parseInt(id); // Convertir el id a número entero

        if (isNaN(roleId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let role = await DbConnection.role.findUnique({
            where: {
                deletedAt: null,
                id: roleId,
            },
        });

        if (!role) {
            return res
                .status(404)
                .json({ message: `Role With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del role */

        role = await DbConnection.role.update({
            where: {
                deletedAt: null,
                id: roleId,
            },
            data: {
                deletedAt: new Date(),
            },
        });

        return res.status(200).json({ role });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const restore = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del role */
        const { id } = req.params;
        const roleId = parseInt(id); // Convertir el id a número entero

        if (isNaN(roleId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let role = await DbConnection.role.findUnique({
            where: {
                deletedAt: {
                    not: null,
                },
                id: roleId,
            },
        });

        if (!role) {
            return res
                .status(404)
                .json({ message: `Role With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del role */

        role = await DbConnection.role.update({
            where: {
                deletedAt: {
                    not: null,
                },
                id: roleId,
            },
            data: {
                deletedAt: null,
            },
        });

        return res.status(200).json({ role });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        /* Validar tanto el id como la existencia del role */
        const { id } = req.params;
        const roleId = parseInt(id); // Convertir el id a número entero

        if (isNaN(roleId)) {
            return res
                .status(400)
                .json({ message: "Invalid ID format" });
        }

        let role = await DbConnection.role.findUnique({
            where: {
                deletedAt: {
                    not: null,
                },
                id: roleId,
            },
        });

        if (!role) {
            return res
                .status(404)
                .json({ message: `Role With Id: ${id} Not Found!` });
        }
        /* Validar tanto el id como la existencia del role */

        role = await DbConnection.role.delete({
            where: {
                deletedAt: {
                    not: null,
                },
                id: roleId,
            },
        });

        return res.status(200).json({ role });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const seed = async (req, res, next) => {
    try {
        const rolesData = [
            {
                name: "ADMIN",
                description: "Administrator",
            },
            {
                name: "VET",
                description: "Veterinarian",
            },
            {
                name: "CLIENT",
                description: "Client",
            },
        ];

        // Crear múltiples roles
        let roles =await DbConnection.role.createMany({
            data: rolesData,
        });

        // Obtener todos los roles que no están eliminados
        roles = await DbConnection.role.findMany({
            where: {
                deletedAt: null,
            },
        });

        res.status(201).json({ roles });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const RoleController = {
    index,
    show,
    create,
    update,
    roleDelete,
    restore,
    destroy,
    seed,
};
