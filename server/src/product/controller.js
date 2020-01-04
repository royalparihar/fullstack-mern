import ProductModel from './model';

export default {
    create: (req, res, next) => {
        const product = new ProductModel({
            name: req.body.name,
            subCategory: req.body.subCategory,
            price: req.body.price
        })
        product.save(function (err, savedProduct) {
            if (err) {
                return res.status(500).send(err)
            }

            res.json({
                product: savedProduct,
            })
        })
    },
    update: (req, res, next) => { 
        ProductModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, savedProduct) => {
            if (err) return res.status(500).send(err)
            res.json({
                success: true,
                product: savedProduct,
            })
        })
    },
    list: (req, res) => {
        let query = {}
        if ('search' in req.query) {
            query.name  = { '$regex' : req.query.search, '$options' : 'i' }
        }
        ProductModel.find(query).populate({
            path : 'subCategory',
            populate : {
              path : 'category'
            }
          }).then((products) => {
            res.json({
                products
            })
        }).catch((err) => res.status(500).send(err))
    },
    get: (req, res) => {
        ProductModel.findOne({_id: req.params.id}).populate({
            path : 'subCategory',
            populate : {
              path : 'category'
            }
          }).then((product) => {
              console.log('req.param.id', req.params.id)
            res.json({
                product
            })
        }).catch((err) => res.status(500).send(err))
    }
}
