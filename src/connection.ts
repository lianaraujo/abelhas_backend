import mongoose from 'mongoose';

import Config from './utils/config-service';

const connectionString = Config.getString('MONGODB_CONN');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected");
});
