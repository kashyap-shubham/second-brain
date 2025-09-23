import express, { Application } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { database } from "./config/db";
import { ErrorHandler } from "./middlewares/errorHandler";
import userRouter from "./routes/user.routes";
import contentRouter from "./routes/content.routes";

export class Server {
  public app: Application;
  private port: number | string;

  constructor(port: number | string = 4000) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cookieParser());
  }

  private initializeRoutes(): void {
    this.app.use("/api/v1/user", userRouter);
    this.app.use("/api/v1/content", contentRouter);
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorHandler.handle);
  }

  public async start(): Promise<void> {
    try {
      await database.connect();

      if (!database.isConnected()) {
        console.error("Database connection failed, server not started");
        return;
      }

      this.app.listen(this.port, () => {
        console.log(`Server started at port: ${this.port}`);
      });
    } catch (error) {
      console.error("Server failed to start:", error);
    }
  }
}

// Auto-start server if executed directly
if (process.argv[1].includes("server.ts")) {
  const server = new Server(process.env.PORT || 4000);
  server.start();
}

