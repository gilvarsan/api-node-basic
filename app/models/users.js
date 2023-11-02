const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('users', userScheme)