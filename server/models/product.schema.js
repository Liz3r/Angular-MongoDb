const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        
    }
)

const Product = mongoose.model("Product",ProductSchema);
mongoose.exports = Product;