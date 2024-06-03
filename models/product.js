const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required:[true, "please enter photoUrl"]

    },
    price: {
        type: Number,
        required:[true, "please enter a price "]
    },
    furnitureName: {
        type: String,
        required:[true, "please enter furniture name"]
    }
})

module.exports = new mongoose.model("products", productSchema)
