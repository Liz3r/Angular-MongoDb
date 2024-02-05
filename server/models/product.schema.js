const mongoose = require("mongoose");
const User = require("./user.schema");

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
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Product = mongoose.model('Product',ProductSchema);
mongoose.exports = Product;