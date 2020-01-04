import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }
})


export default mongoose.model('Product', Schema);