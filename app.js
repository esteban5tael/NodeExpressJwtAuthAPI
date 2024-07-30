import "dotenv/config";
import cors from "cors";
import express from "express";
import appRouter from "./routes/_app.routes.js";
import roleRouter from "./routes/role.routes.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import adminMiddleware from "./middlewares/admin.middleware.js";

const APP_PORT = process.env.APP_PORT || 4000;
const APP_GLOBAL_PREFIX = process.env.APP_GLOBAL_PREFIX || "/api/v1";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${APP_GLOBAL_PREFIX}/roles`, adminMiddleware, roleRouter);
app.use(`${APP_GLOBAL_PREFIX}/users`, adminMiddleware, userRouter);
app.use(`${APP_GLOBAL_PREFIX}/auth`, authRouter);
app.use(APP_GLOBAL_PREFIX, appRouter);

try {
    app.listen(APP_PORT, () => {
        console.log(
            `Server Is Running on http://localhost:${APP_PORT}${APP_GLOBAL_PREFIX}`
        );
    });
} catch (error) {
    console.log(error);
    throw error;
}
