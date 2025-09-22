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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Database_connectionString, _Database_isConnected;
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor(dbConnectionUrl) {
        _Database_connectionString.set(this, void 0);
        _Database_isConnected.set(this, false);
        const connectionString = dbConnectionUrl || process.env.DB_URL;
        if (!connectionString) {
            throw new Error("Database Connection String is required");
        }
        __classPrivateFieldSet(this, _Database_connectionString, connectionString, "f");
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _Database_isConnected, "f")) {
                console.log("Already connected to the database");
                return;
            }
            try {
                yield mongoose_1.default.connect(__classPrivateFieldGet(this, _Database_connectionString, "f"));
                __classPrivateFieldSet(this, _Database_isConnected, true, "f");
                console.log("Database Connected Successfully.");
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Database Connection failed: ", error.message);
                }
                else {
                    console.error("Database Connection failed: ", error);
                }
                process.exit(1);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _Database_isConnected, "f")) {
                console.log("Database is not Connected");
                return;
            }
            try {
                yield mongoose_1.default.disconnect();
                __classPrivateFieldSet(this, _Database_isConnected, false, "f");
                console.log("Database is Disconnected Successfully");
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error during disconnection: ", error.message);
                }
                else {
                    console.error("Error during disconnection: ", error);
                }
            }
        });
    }
    isConnected() {
        return __classPrivateFieldGet(this, _Database_isConnected, "f");
    }
    getConnectionString() {
        return __classPrivateFieldGet(this, _Database_connectionString, "f");
    }
}
_Database_connectionString = new WeakMap(), _Database_isConnected = new WeakMap();
exports.database = new Database();
