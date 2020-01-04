import SubCategoryModel from './model';

export default {
    create: (req, res, next) => {
        SubCategoryModel
            .findOne({
                name: req.body.name
            }, function (err, existingDoc) {
                if (err) return res.status(422).send(err);
                if (existingDoc) {
                    return res
                        .status(422)
                        .send({error: 'Sub Category already created'});
                }
                const subCategory = new SubCategoryModel({
                    name: req.body.name,
                    category: req.body.category,
                })
                subCategory.save(function (err, savedSubCategory) {
                    if (err) {
                        return res.status(500).send(err)
                    }
    
                    res.json({
                        success: true,
                        subCategory: savedSubCategory,
                    })
                })
            })
    },
    update: (req, res, next) => { 
        SubCategoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, savedSubCategory) => {
            if (err) return res.status(500).send(err)
            res.json({
                success: true,
                category: savedSubCategory,
            })
        })
    },
    list: (req, res) => {
        SubCategoryModel.find().populate({path : 'category'}).then((data) => {
            res.json({
                data
            })
        }).catch((err) => res.status(500).send(err))
    } 
    
}
