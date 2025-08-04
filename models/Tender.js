const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  closingDate: { type: Date, required: true },
  documentUrl: { type: String },
});

module.exports = mongoose.model('Tender', tenderSchema);
