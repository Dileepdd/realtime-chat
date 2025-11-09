import mongoose, { Schema } from 'mongoose';
const MessageSchema = new Schema({
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    type: {
        type: String,
        enum: ['text', 'image', 'file', 'video'],
        default: 'text',
    },
    deliveredTo: { type: [Schema.Types.ObjectId], ref: 'User' },
    seenBy: { type: [Schema.Types.ObjectId], ref: 'User' },
}, {
    timestamps: true,
});
export const Message = mongoose.model('Message', MessageSchema);
//# sourceMappingURL=IMessage.js.map