import Controller from './controller';

const router = require('express').Router();

router.post('/create', Controller.create)
router.get('/list', Controller.list)
router.put('/update/:id', Controller.update)
router.get('/get/:id', Controller.get)

export default router;