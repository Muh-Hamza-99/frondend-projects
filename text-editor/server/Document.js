const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    _id: String,
    data: Object,
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;