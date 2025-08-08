const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, index: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional (for direct messages), can be null for broadcast
  text: { type: String, default: '' },
  attachments: [{ url: String, type: String }], 
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
}, {
  timestamps: true
});


ChatMessageSchema.statics.fetchRecent = function(sessionId, limit = 50) {
  return this.find({ sessionId }).sort({ createdAt: -1 }).limit(limit).exec();
};

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
