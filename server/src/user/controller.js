import UserModel from './model';

export default {
    updateProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                name: {
                    first: req.body.firstName, 
                    last: req.body.lastName
                }
            };
            delete newProfile.email;
            delete newProfile.phone;
            delete newProfile.password;
            
            UserModel.findByIdAndUpdate(userId, newProfile, {new: true})
            .then(() => res.sendStatus(200))
            .catch((err) => res.status(500).send(err))
        })
    },
    addCart: (req, res) => {
        const userId = req.user._id;
        UserModel.findById(userId).populate('cart.product').exec((err, user) => {
            if (err) return res.status(500).send(err)
            if (!req.body.productId) return res.status(422).send('Product Id not provided')
            const productExists = user.cart.find(({product}) => product._id == req.body.productId)
            if (productExists) {
                productExists.count += 1
                user.save((err) => {
                    if (err) return res.status(500).send(err)
                    res.json({
                        cart: user.cart
                    }) 
                })
            } else {
                UserModel.findByIdAndUpdate(userId, {$push: {cart: {
                    product: req.body.productId,
                    count: 1
                }}}, {new: true}).populate('cart.product').exec((err, user) => {
                    if (err) return res.status(500).send(err)
                    res.json({
                        cart: user.cart
                    })
                })
            }
        })
    },
    removeCart: (req, res) => {
        const userId = req.user._id;
        UserModel.findById(userId).populate('cart.product').exec((err, user) => {
            if (err) return res.status(500).send(err)
            const productExists = user.cart.find(({product}) => product._id == req.body.productId)
            if (productExists && productExists.count > 1) {
                productExists.count -= 1
                user.save((err) => {
                    if (err) return res.status(500).send(err)
                    res.json({
                        cart: user.cart
                    }) 
                })
            } else {
                UserModel.findByIdAndUpdate(userId, {$pull: {cart: { product: req.body.productId }}}, {new: true}).populate('cart.product').exec((err, user) => {
                    if (err) return res.status(500).send(err)
                    res.json({
                        cart: user.cart
                    })
                })
                // remove(user.cart, ({ product }) => product == req.body.productId)
            }
        })
    }
    
}
