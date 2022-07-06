const mongoose = require("mongoose");

const newSchema = mongoose.Schema({
  picture: String,
  title: String,
  text: String,
  category: {
    ref: "Category",
    type: mongoose.SchemaTypes.ObjectId,
  },
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
});

const New = mongoose.model("New", newSchema);

module.exports = New;
