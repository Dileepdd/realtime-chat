import { Room } from '../../models/Room.js';
import { DataService } from './data.service.js';
import { IRoomDocument } from '../../models/Room.js';

// Model-specific service extending generic DataService
export class RoomService extends DataService<IRoomDocument> {
  constructor() {
    super(Room);
  }

  // Model-specific method: find rooms by member ID
  async findByMemberId(memberId: string): Promise<IRoomDocument[]> {
    return this.model.find({ members: memberId }).exec();
  }
}

// Export a singleton instance
export const roomService = new RoomService();
