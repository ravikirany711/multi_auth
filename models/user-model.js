const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    googleId: String,
    facebookId: String,
    thumbnail: String

})

//creating the model
const User = mongoose.model('user', userSchema)

module.exports = User;
