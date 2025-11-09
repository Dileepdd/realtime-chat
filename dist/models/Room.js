import mongoose, { Schema } from 'mongoose';
const RoomSchema = new Schema({
    name: { type: String },
    isGroup: { type: Boolean },
    members: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});
export const Room = mongoose.model('Room', RoomSchema);
//# sourceMappingURL=Room.js.map