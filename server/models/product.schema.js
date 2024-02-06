const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        datePosted: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Product = mongoose.model('Product',ProductSchema);
mongoose.exports = Product;