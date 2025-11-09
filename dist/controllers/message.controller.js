import { messageService } from '../services/database/message.service.js';
export const createMessage = async (req, res) => {
    try {
        const { roomId, content, type } = req.body;
        const userId = req.userId;
        const message = await messageService.create({
            roomId,
            senderId: userId,
            content,
            type,
        });
        res.status(201).json(message);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
export const getMessagesByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (!roomId) {
            return res.status(400).json({ success: false, message: 'roomId is required' });
        }
        const messages = await messageService.find({ roomId });
        res.status(200).json({
            success: true,
            roomId,
            total: messages.length,
            messages,
        });
    }
    catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err });
    }
};
//# sourceMappingURL=message.controller.js.map