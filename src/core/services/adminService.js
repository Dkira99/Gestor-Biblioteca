const bcrypt = require('bcrypt');
const Admin = require('../domain/models/admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registerInitialAdmin({ dni, name, email, password, phoneNumber }) {
  const existingAdmin = await Admin.findOne();
  if (existingAdmin) throw new Error('Ya existe un administrador registrado.');

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    dni,
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { admin, token };
}

async function registerAdmin({ dni, name, email, password, phoneNumber }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    dni,
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });
  return admin;
}

module.exports = { registerInitialAdmin, registerAdmin };
