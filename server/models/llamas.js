var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Llama = new Schema({
    name: String,
    age: Number,
    spitter: Boolean
});

//pull info from .env file
mongoose.connect(process.env.MONGO_URI); //|| 'mongodb://localhost/...'

module.exports = mongoose.model("llamas", Llama)
