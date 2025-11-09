import { DataService } from './data.service.js';
import { IMessageDocument } from '../../models/IMessage.js';
export declare class MessageService extends DataService<IMessageDocument> {
    constructor();
    findByRoomId(roomId: string): Promise<IMessageDocument[]>;
}
export declare const messageService: MessageService;
//# sourceMappingURL=message.service.d.ts.map