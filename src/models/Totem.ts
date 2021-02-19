import { model, Schema, Document } from "mongoose";

export interface ITotem extends Document {
  latitude: number;
  longitude: number;
}

const TotemSchema: Schema = new Schema({
  latitude: Number,
  longitude: Number,
});

export default model<ITotem>('Totem', TotemSchema)
