const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // @avatar for upload image in your profile
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
} );

module.exports = User = mongoose.model( 'users', UserSchema );
