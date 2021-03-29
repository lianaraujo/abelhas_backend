import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    _password: string,
    role: string,
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    _password: { type: String, required: true },
    role: { type: String, required: true, enum: ["USER", "ADMIN"] }
});

export default model<IUser>('User', UserSchema)
