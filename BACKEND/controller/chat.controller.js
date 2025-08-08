const ChatMessage = require("../models/ChatMessage.model");
const { io, getReceiverSocketId } = require("../utils/socket");

const sendMessage = async (req, res) => {
    try {
        const { text, attachments = [], receiverId } = req.body;
        const senderId = req.user._id;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        const newMessage = new ChatMessage({
            senderId,
            receiverId,
            text,
            attachments
        });

        await newMessage.save();

        // Emit message to receiver if online
        const receiverSocketId = getReceiverSocketId(receiverId.toString());
        if (receiverSocketId) {
            io().to(receiverSocketId).emit("chat:newMessage", newMessage);
        }

        res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getConversation = async (req, res) => {
    try {
        const { userId } = req.params; 
        const currentUserId = req.user._id;

        const messages = await ChatMessage.fetchConversation(currentUserId, userId, 50);
        res.status(200).json({ data: messages.reverse() });
    } catch (error) {
        console.error("Error fetching conversation:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const markAsRead = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;

        await ChatMessage.updateMany(
            { senderId: userId, receiverId: currentUserId, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        console.error("Error marking as read:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { sendMessage, getConversation, markAsRead };
