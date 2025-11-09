import { Room } from '../../models/Room.js';
import { DataService } from './data.service.js';
// Model-specific service extending generic DataService
export class RoomService extends DataService {
    constructor() {
        super(Room);
    }
    // Model-specific method: find rooms by member ID
    async findByMemberId(memberId) {
        return this.model.find({ members: memberId }).exec();
    }
}
// Export a singleton instance
export const roomService = new RoomService();
//# sourceMappingURL=room.service.js.map