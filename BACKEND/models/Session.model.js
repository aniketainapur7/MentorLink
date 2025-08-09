// models/Session.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const SessionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'], 
    default: 'requested' 
  },
  meetingurl : { type: String, required: true, index: true }, 
  startTime: { type: Date },
  endTime: { type: Date },
  durationMinutes: { type: Number },
  feedback: FeedbackSchema,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

SessionSchema.methods.markComplete = function({ endTime = new Date(), feedback = null } = {}) {
  this.status = 'completed';
  this.endTime = endTime;
  if (this.startTime) {
    this.durationMinutes = Math.round((this.endTime - this.startTime) / 60000);
  }
  if (feedback) this.feedback = feedback;
  return this.save();
};

module.exports = mongoose.model('Session', SessionSchema);
