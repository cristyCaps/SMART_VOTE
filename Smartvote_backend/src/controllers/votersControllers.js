const Voters = require("../models/votersModel");

exports.registerVoters = async (req, res) => {
  try {
    const {
      id_number,
      firstname,
      lastname,
      email,
      password,
      gender,
      course,
      year_level,
    } = req.body;
    const voters = await Voters.register(
      id_number,
      firstname,
      lastname,
      email,
      password,
      gender,
      course,
      year_level
    );

    res.status(201).json(voters);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

exports.loginVoters = async (req, res) => {
  try {
    const { id_number, password } = req.body;
    const loginvoters = await Voters.login(id_number, password);
    res.json(loginvoters);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
