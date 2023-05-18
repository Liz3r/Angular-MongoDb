const mongoose = require("mongoose");
const User = require("./user.schema");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: User
        }
    }
)

const Product = mongoose.model('Product',ProductSchema);
mongoose.exports = Product;