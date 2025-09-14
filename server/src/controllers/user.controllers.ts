import { Request, Response, NextFunction } from "express";
import { IUserService } from "../services/user.service";
import { HttpStatus } from "../constants/httpStatus";
import { ResponseHandler } from "../utils/ResponseHandler";
import { SignupInput, SigninInput } from "../schema/user.schema";



type TypedRequestBody<T> = Request<{}, {}, T>;


export class UserController {
    
    private readonly userServices: IUserService;

    constructor(userServices: IUserService  ) {
        this.userServices = userServices;

        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);

    }
    
    // signup controller
    public async signup(req: TypedRequestBody<SignupInput>, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, userName} = req.body;

            const user = await this.userServices.createUser({ email, password, userName });

            ResponseHandler.success(res, HttpStatus.CREATED, {
                id: user._id,
                email: user.email,
                userName: user.userName
            }, "User Created successfully");

        } catch(error) {
            next(error);
        }
    } 
    
    
    // signin controller
    public async signin(req: TypedRequestBody<SigninInput>, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body;

            const token = await this.userServices.authenticateUser(email, password);

            ResponseHandler.success(res, HttpStatus.OK, { token }, "Login Successful");

        } catch(error) {
            next(error);
        }
    }
}