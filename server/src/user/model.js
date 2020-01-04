import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define the model
const Schema = new mongoose.Schema({
    name: {
        first: String,
        last: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: String,
    phone: {
        number: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    cart: [{
        count: {
            type: Number,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
}, { usePushEach: true })

Schema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) { return next(err); }

            user.password = hash;
            next()
        })
    })
})

Schema.methods.comparedPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, good){
        if (err ) { return cb(err)}
        cb(null, good);
    })
}

export default mongoose.model('User', Schema);