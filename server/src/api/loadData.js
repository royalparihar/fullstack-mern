import data from '../data';
import ProductModel from '../product/model';
import CategoryModel from '../category/model';
import SubCategoryModel from '../subCategory/model';

// need to add this to support async await
import "babel-polyfill"

const createCategory = (name) => new Promise((resolve, reject) => {
  CategoryModel
    .findOne({
        name: name
    }, function (err, doc) {
        if (err) return reject(err);
        if (doc) {
            return resolve(doc._id);
        }
        const nweDoc = new CategoryModel({
            name,
        })

        nweDoc.save(function (err, savedDoc) {
            if (err) {
                return reject(err)
            }
            resolve(savedDoc._id)
        })
    })
})

const createSubCategory = (name, categoryId) => new Promise((resolve, reject) => {
  SubCategoryModel
    .findOne({
        name: name
    }, function (err, doc) {
        if (err) return reject(err);
        if (doc) {
            return resolve(doc._id);
        }
        const nweDoc = new SubCategoryModel({
            name,
            category: categoryId
        })

        nweDoc.save(function (err, savedDoc) {
            if (err) {
                return reject(err)
            }
            resolve(savedDoc._id)
        })
    })
})

const createProduct = (name, brand, price, subCategoryId) => new Promise((resolve, reject) => {
  ProductModel
    .findOne({
        name: name
    }, function (err, doc) {
      if (err) return reject(err);
        if (doc) {
            return resolve(doc);
        }
        const nweDoc = new ProductModel({
            name,
            description: brand,
            price,
            subCategory: subCategoryId
        })
      
        
        nweDoc.save(function (err, savedDoc) {
            if (err) {
                return reject(err)
            }
            resolve(savedDoc)
        })
    })
})
export default {
  loadData : (req, res, next) => {
    data.forEach(async (item) => {
      const categoryId = await createCategory(item.category)
      const subCategoryId = await createSubCategory(item.subCategory, categoryId)
      item.products.forEach( async ({ name, brand, price }) => {
        console.log('subCategoryId', subCategoryId, 'doc', name,
      brand,
      price)
        await createProduct(name, brand, price, subCategoryId)
      })
    })
    res.send({success: true})
  }
}