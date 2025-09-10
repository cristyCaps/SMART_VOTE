const db = require("../config/db");

const Voters = {
  register: async (
    _id_number,
    _firstname,
    _lastname,
    _email,
    _password,
    _gender,
    _course,
    _year_level
  ) => {
    const [rows] = await db.execute("CALL Register(?,?,?,?,?,?,?,?)", [
      _id_number,
      _firstname,
      _lastname,
      _email,
      _password,
      _gender,
      _course,
      _year_level,
    ]);

    return rows[0][0];
  },

  login: async (_id_number, _password) => {
    const [rows] = await db.execute("CALL VotersLogin(?,?)", [
      _id_number,
      _password,
    ]);

    const result = rows[0];
    if (result.length > 0) {
      return result;
    } else {
      return { retVal: 0, resmsg: "Invalid Credentials" };
    }
  },
};

module.exports = Voters;
