const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbaian:H7wrgJ9jXilDF3u8@cluster0.oouhp.mongodb.net/ian?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("connected");
});
