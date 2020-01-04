import Controller from './controller';

const router = require('express').Router();

router.get('/list', Controller.list)
router.post('/create', Controller.create)
router.put('/update/:id', Controller.update)

export default router;