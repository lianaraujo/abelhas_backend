import mongoose from 'mongoose';
import Config from "./utils/config-service";

const atlasdb = Config.getString("MONGODB")

mongoose.connect(atlasdb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected");
});
