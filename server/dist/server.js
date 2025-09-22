"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./config/db");
const errorHandler_1 = require("./middlewares/errorHandler");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
class Server {
    constructor(port = 4000) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes() {
        this.app.use("/api/v1/user", user_routes_1.default);
        this.app.use("/api/v1/content", content_routes_1.default);
    }
    initializeErrorHandling() {
        this.app.use(errorHandler_1.ErrorHandler.handle);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.database.connect();
                if (!db_1.database.isConnected()) {
                    console.error("Database connection failed, server not started");
                    return;
                }
                this.app.listen(this.port, () => {
                    console.log(`Server started at port: ${this.port}`);
                });
            }
            catch (error) {
                console.error("Server failed to start:", error);
            }
        });
    }
}
exports.Server = Server;
// Auto-start server if executed directly
if (process.argv[1].includes("server.ts")) {
    const server = new Server(process.env.PORT || 4000);
    server.start();
}
