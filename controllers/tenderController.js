const Tender = require('../models/Tender');

exports.getTenders = async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tenders', error: err.message });
  }
};

exports.createTender = async (req, res) => {
  try {
    const tender = new Tender(req.body);
    await tender.save();

    // Emit specific event for frontend listener
    const io = req.app.get('io');
    if (io) {
      io.emit('new-tender', { title: tender.title });
    }

    res.status(201).json(tender);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create tender', error: err.message });
  }
};

exports.getSingleTender = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }
    res.json(tender);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tender', error: err.message });
  }
};

exports.updateTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }
    res.json(tender);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tender', error: err.message });
  }
};

exports.deleteTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }
    res.json({ message: 'Tender deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tender', error: err.message });
  }
};
