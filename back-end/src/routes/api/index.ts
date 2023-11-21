import express from 'express';
const router = express.Router();

router.use('/products', require('./products'));

module.exports = router;
