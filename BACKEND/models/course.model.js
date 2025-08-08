
const mongoose = require('mongoose');
const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['video', 'pdf', 'text'], required: true },
  url: { type: String, required: true },
  durationMinutes: { type: Number } // optional, for videos
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  lessons: [LessonSchema],
  price: { type: Number, default: 0 },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });


CourseSchema.methods.addRating = function(newRating) {
  this.rating = ((this.rating * this.ratingCount) + newRating) / (this.ratingCount + 1);
  this.ratingCount += 1;
  return this.save();
};

module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema);
