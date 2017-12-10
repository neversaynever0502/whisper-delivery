import express from 'express';


import lettersRoutes from './letters'

const router = express.Router();
/* GET home page. */
router.use('/letters',lettersRoutes)

module.exports = router;
