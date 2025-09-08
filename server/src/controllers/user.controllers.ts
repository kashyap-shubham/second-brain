import { isValidObjectId } from "../utils/validateObjectId.js";
import { ApiError } from "../utils/apiErrors.js";

export class UserController {
    constructor(userService) {
        this.userService = userService;

        // Bind all instance methods to ensure `this` works in routes
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.sendTokenResponse = this.sendTokenResponse.bind(this);
    }

    // Helper: send token response
    async sendTokenResponse(user, res, message = "Success") {
        try {
            const token = await user.generateToken();
            const options = { httpOnly: true, secure: true, sameSite: "None" };

            res.status(200)
                .setHeader("Authorization", `Bearer ${token}`)
                .cookie("token", token, options)
                .json({
                    message,
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token
                    }
                });
        } catch (error) {
            console.error("Error generating token:", error);
            throw new ApiError(500, "Error generating token");
        }
    }

    // Sign Up
    async signUp(req, res, next) {
        const { firstName, lastName, email, password, bio } = req.body;

        try {
            const existingUser = await this.userService.findByEmail(email);
            if (existingUser) return next(new ApiError(400, "User Already Exists"));

            const user = await this.userService.createUser({ firstName, lastName, email, password, bio });
            return this.sendTokenResponse(user, res, "User Signed Up Successfully");

        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "Error Signing Up, Please Try Again"));
        }
    }

    // Sign In
    async signIn(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) return next(new ApiError(400, "Please provide email and password"));

        try {
            const user = await this.userService.findByEmail(email);
            if (!user) return next(new ApiError(400, "Invalid Email or Password"));

            const isMatch = await user.isPasswordCorrect(password);
            if (!isMatch || isMatch === "None") return next(new ApiError(400, "Invalid Email or Password"));

            return this.sendTokenResponse(user, res, "Login Successful");

        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "Error Logging In, Please Try Again"));
        }
    }

    // Log Out
    async logOut(req, res, next) {
        try {
            return res.status(200)
                .cookie("token", "", { expires: new Date(0), httpOnly: true, secure: true, sameSite: "None" })
                .json({ message: "User Signed Out Successfully" });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "Internal Server Error"));
        }
    }

    // Edit Profile
    async editProfile(req, res, next) {
        const userId = req.user._id;
        const { firstName, lastName, bio, avatar } = req.body;

        if (!isValidObjectId(userId)) return next(new ApiError(400, "Invalid Id"));

        try {
            const updatedUser = await this.userService.updateUser(userId, { firstName, lastName, bio, avatar });
            res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "Error updating profile"));
        }
    }
}
