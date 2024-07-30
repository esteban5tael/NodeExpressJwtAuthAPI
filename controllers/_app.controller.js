const AppIndex = (req, res, next) => {
    try {
        res.status(200).json({
            message: "Welcome to the App",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const AppController = {
    AppIndex,
};
