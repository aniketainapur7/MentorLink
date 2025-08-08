// models/chatmessage.model.js
const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: '' },
  attachments: [{ url: String, type: String }],
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
}, {
  timestamps: true
});

ChatMessageSchema.statics.fetchConversation = function (user1, user2, limit = 50) {
  return this.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec();
};

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
