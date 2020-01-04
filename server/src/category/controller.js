import CategoryModel from './model';

export default {
    create: (req, res, next) => {
        CategoryModel
            .findOne({
                name: req.body.name
            }, function (err, existingCategory) {
                if (err) return res.status(422).send(err);
                if (existingCategory) {
                    return res
                        .status(422)
                        .send({error: 'Category already created'});
                }
                const category = new CategoryModel({
                    name: req.body.name,
                })
    
                category.save(function (err, savedCategory) {
                    if (err) {
                        return res.status(500).send(err)
                    }
    
                    res.json({
                        category: savedCategory,
                    })
                })
            })
    },
    update: (req, res, next) => { 
        CategoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, savedCategory) => {
            if (err) return res.status(500).send(err)
            res.json({
                success: true,
                category: savedCategory,
            })
        })
    },
    list: (req, res) => {
        CategoryModel.find().then((data) => {
            res.json({
                data
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
    } 
    
}
