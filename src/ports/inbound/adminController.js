const adminService = require('../../core/services/adminService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registerInitialAdmin(req, res) {
  const { dni, name, email, password, phoneNumber } = req.body;
  try {
    const { admin, token } = await adminService.registerInitialAdmin({ dni, name, email, password, phoneNumber });
    res.status(201).json({ message: 'Administrador inicial registrado con éxito', admin, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function registerAdmin(req, res) {
  const { dni, name, email, password, phoneNumber } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; 
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
  if (!decodedToken || decodedToken.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });

  try {
    const admin = await adminService.registerAdmin({ dni, name, email, password, phoneNumber });
    res.status(201).json({ message: 'Administrador registrado con éxito', admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { registerInitialAdmin, registerAdmin };
