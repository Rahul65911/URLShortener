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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

module.exports.URL = mongoose.model("urls", URLSchema);