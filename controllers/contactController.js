const Contact = require('../models/Contact');
const { generateAutoReply } = require('../utils/aiHelper');


exports.getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

exports.createContact = async (req, res) => {
  try {
    const autoReply = await generateAutoReply(req.body.message);
    const contact = new Contact({ ...req.body });
    await contact.save();
    res.status(201).json({ message: 'Message received', autoReply, contact });
  } catch (err) {
    res.status(500).json({ message: 'Failed to process message', error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
};