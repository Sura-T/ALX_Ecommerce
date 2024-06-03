const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter a email "]
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    }
})

module.exports = new mongoose.model("users", userSchema)

