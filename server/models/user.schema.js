const mongoose = require("mongoose");
const Product = require("./product.schema");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        hashPassword: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
        // ,
        // followingProducts: [
        //     { 
        //         type: mongoose.SchemaTypes.ObjectId,
        //         ref: Product
        //     }
        // ]
    }
)

const User = mongoose.model('User',UserSchema);
module.exports = User;