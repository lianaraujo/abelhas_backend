import * as mongoose from "mongoose";

const user = new mongoose.Schema({
    id: Number,
    email: String,
    _password: String,
})

const User = mongoose.model('User', user);

export default User;
