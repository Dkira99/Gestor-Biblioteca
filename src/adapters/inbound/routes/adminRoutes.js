const express = require('express');
const router = express.Router();
const adminController = require('../../../ports/inbound/adminController');

router.post('/register-initial', adminController.registerInitialAdmin);
router.post('/register', adminController.registerAdmin);

module.exports = router;
