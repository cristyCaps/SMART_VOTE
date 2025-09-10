const db = require('../config/db');

const User = {
  create: async (name, email) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, name, email };
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.execute('CALL GetUserById(?)', [id]);
    return rows[0][0]; // stored procedure returns array of arrays
  },

  update: async (id, name, email) => {
    await db.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      id,
    ]);
    return { id, name, email };
  },

  delete: async (id) => {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return;
  },
};

module.exports = User;
