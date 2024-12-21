const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ 
        timeStamp: {type: Date}, 
        location: {
            country: String,
            city: String
        },
        device: String,
        referrer: String 
    }],
},
{
    timestamps: true,
})

const URL = mongoose.model("urls", URLSchema);

module.exports = URL;