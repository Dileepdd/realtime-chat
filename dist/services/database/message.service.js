import { Message } from '../../models/IMessage.js';
import { DataService } from './data.service.js';
// Model-specific service extending generic DataService
export class MessageService extends DataService {
    constructor() {
        super(Message);
    }
    // Model-specific method: find messages by room ID
    async findByRoomId(roomId) {
        return this.model.find({ roomId }).exec();
    }
}
// Export a singleton instance
export const messageService = new MessageService();
//# sourceMappingURL=message.service.js.map