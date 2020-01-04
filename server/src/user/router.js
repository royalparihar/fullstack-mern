import UserController from './controller';

const router = require('express').Router();

router.get('/profile', (req, res)=>{
    res.send(req.user);
})

router.post('/profile', UserController.updateProfile)

router.put('/addCart', UserController.addCart)

router.put('/removeCart', UserController.removeCart)

export default router;