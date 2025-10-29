const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id:Number,
  name: String,
  price: String,
  image: String,
  description: String
}, { collection: "productdata" }); 

module.exports = mongoose.model("Products", productSchema);
