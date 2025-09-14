import { User, IUserDocument } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { HttpStatus } from "../constants/httpStatus";

// Input DTO for creating user
interface CreateUserDTO {
  email: string;
  password: string;
  userName: string;
}

// Contract for user service
export interface IUserService {
  createUser(data: CreateUserDTO): Promise<IUserDocument>;
  authenticateUser(email: string, password: string): Promise<string>;
}

// Implementation
export class UserService implements IUserService {
  // Create new user
  public async createUser(data: CreateUserDTO): Promise<IUserDocument> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new ApiError("User with this email already exists", HttpStatus.CONFLICT);
    }

    const user = new User(data);
    await user.save();
    return user;
  }

  // Authenticate user (login)
  public async authenticateUser(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return user.generateAuthToken();
  }
}
