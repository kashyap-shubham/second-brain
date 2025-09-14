import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { database } from "./config/db";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ErrorHandler } from "./middlewares/errorHandler";
import userRouter from "./routes/user.routes";
import contentRouter from "./routes/content.routes";


const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(helmet());
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);


app.use(ErrorHandler.handle);


const startSever = async () => {
    await database.connect();

    if (!database.isConnected()) {
        return;
    }

    app.listen(port, () => console.log(`Server Started at port: ${port}`));
}


if (process.argv[1] === __filename) {
    startSever();
}