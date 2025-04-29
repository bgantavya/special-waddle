import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    email: string; 
    password: string;
    name: string;
    listedProperties: mongoose.Types.ObjectId[];
    boughtProperties: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    listedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    boughtProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
