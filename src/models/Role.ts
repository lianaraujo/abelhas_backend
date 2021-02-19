import { model, Schema, Document } from "mongoose";

export interface IRole extends Document {
    name: string,
}

const RoleSchema: Schema = new Schema({
    name: String
});

export default model<IRole>('Role', RoleSchema)
