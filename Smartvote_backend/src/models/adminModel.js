const db = require('../config/db');

const testemails = [
  {id: 1, email: "joshuacatapan2003@gmail.com"},
  {id: 2, email: "crmchs.metante.jessriel@gmail.com"},
  {id: 3, email: "caparosocriety29@gmail.com"},
  {id: 3, email: "edwardcatapan@gmail.com"},
 
]

const sendEmail = require('../utils/mailer');

const Admin = {

// Open filing of candidacy
  openFilingOfCandidacy: async (_secretkey, _admin_id, _start_date, _end_date, _status) => {
    const [rows] = await db.execute('CALL OpenFilingOfCandidacy(?, ?, ?, ?, ?)', [
        _secretkey,    
        _admin_id,
        _start_date,
        _end_date,
        _status,
    ]);
   const result = rows[0][0];
   // return rows[0][0]; // stored procedure returns array of arrays
   // Check if email should be sent
        if (result.retVal === 1) {
        await sendEmail({
            to: testemails.map((e) => e.email), // ✅ extract email addresses
            text: `Hello ,\n\nThe filing of candidacy is now officially open.\n\nIf you believe you have the qualities to lead and serve, we highly encourage you to file your candidacy within the given deadline.\n\nThank you.`,
            html: `
              <p>Hello</p>
              <p>The <strong>filing of candidacy</strong> is now officially open.</p>
              <p>If you believe you have the qualities to lead and serve, we highly encourage you to file your candidacy within the given deadline.</p>
              <p>Thank you.</p>
                      `

        });
        }

         return result;
        
 
  },  

 getFilingStatus: async() => {
  const [rows] = await db.execute('CALL GetFilingStatus()');
  return rows[0][0]; 
}
};

module.exports = Admin;
