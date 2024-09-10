const librarianService = require('../../core/services/librarianService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registerLibrarian(req, res) {
  const { dni, name, email, password, phoneNumber } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
  if (!decodedToken || (decodedToken.role !== 'admin' && decodedToken.role !== 'librarian')) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  try {
    const librarian = await librarianService.registerLibrarian({ dni, name, email, password, phoneNumber, creatorEmail: decodedToken.email });
    res.status(201).json({ message: 'Bibliotecario registrado con éxito', librarian });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { registerLibrarian };
