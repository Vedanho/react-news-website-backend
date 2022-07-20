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

const News = mongoose.model("News", newSchema);

module.exports = News;
