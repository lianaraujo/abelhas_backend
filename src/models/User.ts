import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    _password: string,
    role: string,
}

const UserSchema: Schema = new Schema({
    email: String,
    _password: String,
    role: { type: String, required: true, enum: ["USER", "ADMIN"] }
});

export default model<IUser>('User', UserSchema)
