const mongoose = require( 'mongoose' );
const config = require( 'config' );
const db = config.get( 'mongoURI' );

const connectDB = async () =>
{
    try
    {
        await mongoose.connect( db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // for login
            useFindAndModify: false//for profile

        } );
        console.log( 'MongoDB Connection Succeeded...' );
    } catch ( err )
    {
        console.log( 'Error in DB Connection : ' + err );
        process.exit( 1 );
    }
};

module.exports = connectDB;
