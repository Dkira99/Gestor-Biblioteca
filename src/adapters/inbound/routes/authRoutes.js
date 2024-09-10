const express = require('express');
const router = express.Router();
const authController = require('../../../ports/inbound/authController'); 

router.post('/login', authController.login);

module.exports = router;
