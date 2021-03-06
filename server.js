const express = require( 'express' );
const connectDB = require( './config/db.js' );
const path = require( 'path' );

const app = express();

connectDB();

app.use( express.json( { extended: false } ) );


app.use( '/api/users', require( './routes/api/users' ) );
app.use( '/api/auth', require( './routes/api/auth' ) );
app.use( '/api/profile', require( './routes/api/profile' ) );



const PORT = process.env.PORT || 3000;
app.listen( PORT, () => 
console.log( `server started on port ${ PORT }` ) );
