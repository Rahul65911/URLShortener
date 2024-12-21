const mongoose = require("mongoose");

module.exports.connect = (url) => {
    return mongoose.connect(url);
}