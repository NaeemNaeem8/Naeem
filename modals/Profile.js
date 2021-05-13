
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;


const ToDoSchema = new Schema( {

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: false,
        max: 40
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createBy: {
        type: String
    },
    createAt: {
        type: String,
       
    },
    date: {
        type: Date,
        default: Date.now
    }

} );

module.exports = Profile = mongoose.model( 'profile',ToDoSchema );
