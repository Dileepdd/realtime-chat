import { DataService } from './data.service.js';
import { User } from '../../models/User.js';
// Model-specific service extending generic DataService
export class UserService extends DataService {
    constructor() {
        super(User);
    }
    // Model-specific method: find by email
    async findByEmail(email) {
        return this.model.findOne({ email }).exec();
    }
    async findByEmailWithPassword(email) {
        return this.model.findOne({ email }).select('+password').exec();
    }
    // Model-specific method: find by username
    async findByUsername(username) {
        return this.model.findOne({ username }).exec();
    }
}
// Export a singleton instance
export const userService = new UserService();
//# sourceMappingURL=user.service.js.map