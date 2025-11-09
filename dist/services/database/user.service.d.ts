import { DataService } from './data.service.js';
import { IUserDocument } from '../../models/User.js';
export declare class UserService extends DataService<IUserDocument> {
    constructor();
    findByEmail(email: string): Promise<IUserDocument | null>;
    findByEmailWithPassword(email: string): Promise<IUserDocument | null>;
    findByUsername(username: string): Promise<IUserDocument | null>;
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map