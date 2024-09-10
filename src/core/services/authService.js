const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../domain/models/admin');
const Librarian = require('../domain/models/librarian');
require('dotenv').config();

async function login({ email, password }) {
  let user;

  user = await Admin.findOne({ where: { email } });

  if (!user) {
    user = await Librarian.findOne({ where: { email } });
  }

  if (!user) throw new Error('Correo electrónico o contraseña incorrectos');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Correo electrónico o contraseña incorrectos');

  const token = jwt.sign({ email: user.email, role: user instanceof Admin ? 'admin' : 'librarian' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
}

module.exports = { login };
