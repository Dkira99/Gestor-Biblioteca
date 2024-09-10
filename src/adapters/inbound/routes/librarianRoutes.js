const express = require('express');
const router = express.Router();
const librarianController = require('../../../ports/inbound/librarianController');

router.post('/register', librarianController.registerLibrarian);

module.exports = router;
