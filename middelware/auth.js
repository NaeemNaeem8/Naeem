const jwt = require( 'jsonwebtoken' );
const config = require( 'config' );

module.exports = function ( req, res, next )
{
    //GET token from header
    const token = req.header( 'x-auth-token' );

    //check if no token
    if ( !token )
    {
        return res.status( 401 ).json( { msg: 'no token, authorization dendied' } );
    }

    //verify token
    try
    {
        // فك التشفير
        const decoded = jwt.verify( token, config.get( 'jwtSecret' ) );
        req.user = decoded.user;
        next();
    } catch ( err )
    {
        res.status( 401 ).json( { msg: 'Token is not valid' } );
    }
};
