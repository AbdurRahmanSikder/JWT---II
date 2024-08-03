const mongoose = require('mongoose');

const resetPassSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    token: {
        type: String
    }
})

const Reset = mongoose.model("Reset", resetPassSchema);

module.exports = Reset;