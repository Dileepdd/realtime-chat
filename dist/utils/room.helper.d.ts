import mongoose from 'mongoose';
export declare const ensureRoom: ({ userId, members, isGroup, name, }: {
    userId: mongoose.Types.ObjectId;
    members?: mongoose.Types.ObjectId[];
    isGroup?: boolean;
    name?: string;
}) => Promise<import("../models/Room.js").IRoomDocument>;
//# sourceMappingURL=room.helper.d.ts.map