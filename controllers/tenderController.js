const Tender = require('../models/Tender');

exports.getTenders = async (req, res) => {
  const tenders = await Tender.find();
  res.json(tenders);
};

exports.createTender = async (req, res) => {
  const tender = new Tender(req.body);
  await tender.save();
  res.status(201).json(tender);
};

exports.getSingleTender = async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (!tender) return res.status(404).json({ message: 'Tender not found' });
  res.json(tender);
};

exports.updateTender = async (req, res) => {
  const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tender);
};

exports.deleteTender = async (req, res) => {
  await Tender.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tender deleted' });
};

exports.createTender = async (req, res) => {
  const tender = new Tender(req.body);
  await tender.save();
  req.app.get('io').emit('new-tender', tender);
  res.status(201).json(tender);
};
