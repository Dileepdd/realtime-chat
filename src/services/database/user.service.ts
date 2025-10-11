import { DataService } from "./data.service";
import { User, IUserDocument } from "../../models/User";

// Model-specific service extending generic DataService
export class UserService extends DataService<IUserDocument> {
  constructor() {
    super(User);
  }

  // Model-specific method: find by email
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({ email }).exec();
  }

  // Model-specific method: find by username
  async findByUsername(username: string): Promise<IUserDocument | null> {
    return this.model.findOne({ username }).exec();
  }
}

// Export a singleton instance
export const userService = new UserService();
