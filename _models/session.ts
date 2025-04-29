import mongoose, { Schema, Document } from 'mongoose'

export interface ISession extends Document {
    userId : mongoose.Types.ObjectId;
    token : string;
    userAgent? : string;
    createdAt : Date;
    expiresAt : Date;
}

const SessionSchema = new Schema<ISession>({
    userId : {type: Schema.Types.ObjectId, ref: "User", required: true},
    token : {type: String, required: true},
    userAgent : {type: String},
    createdAt : { type: Date, default: Date.now },
    expiresAt : { type: Date, required: true }
})

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired

export default mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);