import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstname: { type: String },
    lastname: { type: String },
}, { timestamps: true });
export const User = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map