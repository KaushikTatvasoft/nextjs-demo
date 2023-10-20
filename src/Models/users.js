import mongoose from 'mongoose';

module.exports = mongoose.models.users || mongoose.model('users', new mongoose.Schema({
  username: { type: String },
  password: { type: String },
}, { versionKey: false })) 