import * as mongoose from "mongoose";

const role = new mongoose.Schema({
    id: Number,
    name: String,

})
const Role = mongoose.model('Role', role);

export default Role;
