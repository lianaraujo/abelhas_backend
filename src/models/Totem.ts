import { model, Schema, Document } from "mongoose";

export interface ITotem extends Document {
  name: string;
  latitude: number;
  longitude: number;
}

const TotemSchema: Schema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

export default model<ITotem>('Totem', TotemSchema)
