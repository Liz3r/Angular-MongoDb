const mongoose = require('mongoose');
const Product = require('./product.schema');

const TagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        subtags: [{
            name: {
                type: String,
                required: true,
                unique: true
            },
            products: [{
                type: mongoose.SchemaTypes.ObjectId,
                ref: Product
            }]
        }]
    }
)

const Tag = mongoose.model("Tag",TagSchema);
mongoose.exports = Tag;