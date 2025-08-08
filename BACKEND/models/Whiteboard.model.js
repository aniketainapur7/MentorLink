
const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  payload: { type: mongoose.Schema.Types.Mixed }, 
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const WhiteboardSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true, unique: true },
  actions: { type: [ActionSchema], default: [] }, 
  lastUpdatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

WhiteboardSchema.methods.appendAction = function(action) {
  this.actions.push(action);
  this.lastUpdatedAt = new Date();
  return this.save();
};

// Optionally: clear actions
WhiteboardSchema.methods.clear = function() {
  this.actions = [];
  this.lastUpdatedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Whiteboard', WhiteboardSchema);
