import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})


export default mongoose.model('SubCategory', Schema);