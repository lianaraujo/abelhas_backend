import * as mongoose from "mongoose";

const totem = new mongoose.Schema({
    id: Number,
    latitude: Number,
    longitude: Number,
})
const Totem = mongoose.model('Totem', totem);

export default Totem;
