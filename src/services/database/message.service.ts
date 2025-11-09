import { Message } from '../../models/IMessage.js';
import { DataService } from './data.service.js';
import { IMessageDocument } from '../../models/IMessage.js';

// Model-specific service extending generic DataService
export class MessageService extends DataService<IMessageDocument> {
  constructor() {
    super(Message);
  }

  // Model-specific method: find messages by room ID
  async findByRoomId(roomId: string): Promise<IMessageDocument[]> {
    return this.model.find({ roomId }).exec();
  }
}

// Export a singleton instance
export const messageService = new MessageService();
