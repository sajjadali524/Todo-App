const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
        required: true
    }
})
const list = mongoose.model("lists", listSchema);
module.exports = list;