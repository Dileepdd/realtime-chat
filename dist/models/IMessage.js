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
MessageSchema.post('save', async function (doc) {
    try {
        await mongoose.model('Room').findByIdAndUpdate(doc.roomId, {
            updatedAt: new Date(),
        });
    }
    catch (err) {
        console.error('Failed to update room timestamp:', err);
    }
});
export const Message = mongoose.model('Message', MessageSchema);
//# sourceMappingURL=IMessage.js.map