import mongoose from 'mongoose';

// Define the model
const Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})


export default mongoose.model('Category', Schema);