import express from 'express';
import * as letter from '../controller/letter'



const router = express.Router();



/* GET users listing. */
router.get('/', letter.readLeter);
router.post('/',letter.writeLeter);
router.post('/readthis',letter.checkPassport);


module.exports = router;