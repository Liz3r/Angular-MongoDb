const mongoose = require("mongoose");

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
        
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: Number,
            required: false
        },
        picture: {
             type: String,
             required: false
         }
    }
)

const User = mongoose.model('User',UserSchema);
module.exports = User;