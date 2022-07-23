const mongoose = require('mongoose')

const prefix = new mongoose.Schema({
    guild: String,
    user: String,
    content: Array
})

module.exports = mongoose.model("prefix", prefix);