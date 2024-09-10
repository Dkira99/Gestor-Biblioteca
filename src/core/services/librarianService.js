const bcrypt = require('bcrypt');
const Librarian = require('../domain/models/librarian');

async function registerLibrarian({ dni, name, email, password, phoneNumber, creatorEmail }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const librarian = await Librarian.create({
    dni,
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    creatorEmail
  });
  return librarian;
}

module.exports = { registerLibrarian };
