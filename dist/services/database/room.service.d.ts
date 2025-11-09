import { DataService } from './data.service.js';
import { IRoomDocument } from '../../models/Room.js';
export declare class RoomService extends DataService<IRoomDocument> {
    constructor();
    findByMemberId(memberId: string): Promise<IRoomDocument[]>;
}
export declare const roomService: RoomService;
//# sourceMappingURL=room.service.d.ts.map