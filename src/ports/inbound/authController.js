const authService = require('../../core/services/authService');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.login({ email, password });
    res.status(200).json({ message: 'Login exitoso', token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { login };
