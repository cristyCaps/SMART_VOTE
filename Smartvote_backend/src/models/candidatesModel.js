const db = require("../config/db");

// wherever you want to send an email
const sendEmail = require("../utils/mailer");

const Candidates = {
  fileCOC: async (
    _firstname,
    _lastname,
    _course,
    _email,
    _position,
    _advocacy,
    _organization
  ) => {
    const [rows] = await db.execute("CALL FileCoC(?,?,?,?,?,?,?)", [
      _firstname,
      _lastname,
      _course,
      _email,
      _position,
      _advocacy,
      _organization,
    ]);
    // return rows[0][0]

    const result = rows[0][0];

    //Check if email should be sent
    if (result.retVal === 1) {
      await sendEmail({
        to: "joshuacatapan2003@gmail.com", //Admin Emails
        subject: "COC Submission",
        text: `Hello Admin,\n\n${_firstname} has submitted an application Of SSG ELECTION FROM BSIT for the position of ${_position}.\n\nPlease review the submission at your earliest convenience.\n\nThank you.`,
        html: `
            <p>Hello Admin,</p>
            <p><strong>${_firstname}</strong> has submitted an application Of SSG ELECTION FROM BSIT for the position of <strong>${_position}</strong>.</p>
            <p>Please review the submission at your earliest convenience.</p>
            <p>Thank you.</p>
            `,
      });
    }

    return result;
  },

  updateCoC: async (
    _id,
    _firstname,
    _lastname,
    _email,
    _course,
    _position,
    _organization,
    _status,
    _approver_remarks,
    _approved_by
  ) => {
    const [rows] = await db.execute("CALL UpdateCoC(?,?,?,?,?,?,?,?,?,?)", [
      _id,
      _firstname,
      _lastname,
      _email,
      _course,
      _position,
      _organization,
      _status,
      _approver_remarks,
      _approved_by,
    ]);
    // return rows[0][0];

    console.log(_email);

    const result = rows[0][0];

    if (result.retVal === 1) {
      await sendEmail({
        to: `${_email}`, //Admin Emails
        subject: "Filed Candidacy",
        text: `Dear ${_firstname},\n\nYour application has been ${_status} for the position of President.\n${_approver_remarks}\n\nThank you.`,
        html: `
      <p>Dear <strong>${_firstname}</strong>,</p>
      <p>Your application has been <strong>${_status}</strong> for the position of <strong>President</strong>.</p>
      <p><strong>Remarks:</strong> ${_approver_remarks}</p>
      <p>Please review the submission at your earliest convenience.</p>
      <p>Thank you.</p>
    `,
      });
    }
    return result;
  },

  findAllCandidates: async () => {
    const [rows] = await db.execute("CALL GetAllCandidates");
    return rows[0];
  },

  findCandidatesById: async (_id) => {
    const [rows] = await db.execute("CALL GetCandidatesByID(?)", [_id]);
    return rows[0][0];
  },
};

module.exports = Candidates;
