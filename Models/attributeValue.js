const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attributeValueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  attribute: {
    type: Schema.Types.ObjectId,
    ref: "Attribute"
  }
});

module.exports = mongoose.model("AttributeValue", attributeValueSchema);
