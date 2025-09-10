const Admin = require('../models/adminModel');

exports.updateFilingofCandidacy = async (req, res) => {
  try {
    const { secretkey, admin_id, start_date, end_date, status } = req.body;
    const admin = await Admin.openFilingOfCandidacy(secretkey, admin_id, start_date, end_date, status);
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFilingStatus = async (req, res) => {
  try {
    const status = await Admin.getFilingStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
