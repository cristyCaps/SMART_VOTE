const Admin = require('../models/adminModel');

exports.updateFilingofCandidacy = async (req, res) => {
  try {
    const { department, secretkey, admin_id, start_date, end_date, status } = req.body;
    let admin;
    if (department) {
      admin = await Admin.openFilingOfCandidacyDept(department, secretkey, admin_id, start_date, end_date, status);
    } else {
      admin = await Admin.openFilingOfCandidacy(secretkey, admin_id, start_date, end_date, status);
    }
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFilingStatus = async (req, res) => {
  try {
    const { dept } = req.query;
    const status = dept
      ? await Admin.getFilingStatusDept(dept)
      : await Admin.getFilingStatus();
    // Fallback: if no record found for the requested department, return CLOSED by default
    if (!status || Object.keys(status).length === 0) {
      return res.json({ department: dept || null, status: 'CLOSED', start_date: null, end_date: null });
    }
    res.json(status);
  } catch (err) {
    // Return graceful fallback for department-scoped queries
    const { dept } = req.query || {};
    if (dept) {
      return res.json({ department: dept, status: 'CLOSED', start_date: null, end_date: null });
    }
    res.status(500).json({ error: err.message });
  }
}
