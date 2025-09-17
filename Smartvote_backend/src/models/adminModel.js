const db = require('../config/db');

const testemails = [
  {id: 1, email: "joshuacatapan2003@gmail.com"},
  {id: 2, email: "crmchs.metante.jessriel@gmail.com"},
  {id: 3, email: "caparosocriety29@gmail.com"},
  {id: 3, email: "edwardcatapan@gmail.com"},
 
]

const sendEmail = require('../utils/mailer');

const Admin = {

// Open filing of candidacy (legacy, no department)
  openFilingOfCandidacy: async (_secretkey, _admin_id, _start_date, _end_date, _status) => {
    const [rows] = await db.execute('CALL OpenFilingOfCandidacy(?, ?, ?, ?, ?)', [
        _secretkey,    
        _admin_id,
        _start_date,
        _end_date,
        _status,
    ]);
    const result = rows[0][0];
    if (result.retVal === 1) {
      await sendEmail({
        to: testemails.map((e) => e.email),
        text: `Hello ,\n\nThe filing of candidacy is now officially open.\n\nIf you believe you have the qualities to lead and serve, we highly encourage you to file your candidacy within the given deadline.\n\nThank you.`,
        html: `
          <p>Hello</p>
          <p>The <strong>filing of candidacy</strong> is now officially open.</p>
          <p>If you believe you have the qualities to lead and serve, we highly encourage you to file your candidacy within the given deadline.</p>
          <p>Thank you.</p>
        `,
      });
    }
    return result;
  },

  // Department-scoped open/update filing
  openFilingOfCandidacyDept: async (_department, _secretkey, _admin_id, _start_date, _end_date, _status) => {
    const [rows] = await db.execute('CALL OpenFilingOfCandidacyDept(?, ?, ?, ?, ?, ?)', [
      _department,
      _secretkey,
      _admin_id,
      _start_date,
      _end_date,
      _status,
    ]);
    const result = rows[0][0];
    return result;
  },

  // Legacy global status
  getFilingStatus: async () => {
    const [rows] = await db.execute('CALL GetFilingStatus()');
    return rows[0][0];
  },

  // Department-scoped status
  getFilingStatusDept: async (_department) => {
    const [rows] = await db.execute('CALL GetFilingStatusDept(?)', [_department]);
    return rows[0][0];
  },
};

module.exports = Admin;
