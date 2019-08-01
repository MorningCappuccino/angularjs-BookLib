const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://node-rest:node-rest@node-rest-ssssn.mongodb.net/test?retryWrites=true'
);

module.exports = mongoose;