import mongoose from 'mongoose';

module.exports = mongoose.models.users || mongoose.model('users', new mongoose.Schema({
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String },
  password: { type: String, required: true },
}, { versionKey: false })) 