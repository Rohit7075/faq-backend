const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { type: String },
    bn: { type: String }
  }
});

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
