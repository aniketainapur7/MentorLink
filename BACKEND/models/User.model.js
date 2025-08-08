const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AvailabilitySlotSchema = new mongoose.Schema({
  day: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, lowercase: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'mentor'], required: true },
  subjects: [{ type: String, trim: true }],
  availability: [AvailabilitySlotSchema],
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  bio: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Add rating
UserSchema.methods.addRating = function(newRating) {
  this.rating = ((this.rating * this.ratingCount) + newRating) / (this.ratingCount + 1);
  this.ratingCount += 1;
  return this.save();
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
