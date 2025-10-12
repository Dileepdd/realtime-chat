import { Room } from "../../models/Room";
import { DataService } from "./data.service";
import { IRoomDocument } from "../../models/Room";

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