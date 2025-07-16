import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
