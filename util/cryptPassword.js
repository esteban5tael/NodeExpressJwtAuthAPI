import bcryptjs from "bcryptjs";
import "dotenv/config";

const hashPassword = async (password) => {
    try {
        const BCRYPT_SALT_ROUNDS =
            parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const SALT = bcryptjs.genSaltSync(BCRYPT_SALT_ROUNDS);
        return bcryptjs.hashSync(password, SALT);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcryptjs.compareSync(
            password,
            hashedPassword
        );

        return isMatch;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const CryptPassword = {
    hashPassword,
    comparePassword,
};
