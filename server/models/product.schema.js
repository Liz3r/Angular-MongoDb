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
        currency: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

ProductSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;