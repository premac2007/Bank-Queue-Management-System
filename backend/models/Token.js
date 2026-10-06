const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    tokenNumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["WAITING", "CALLED", "IN_SERVICE", "COMPLETED", "SKIPPED"],
        default: "WAITING"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Token", tokenSchema);