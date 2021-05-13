
const express = require( 'express' );
const router = express.Router();
const auth = require( '../../middelware/auth' );
const Profile = require( '../../modals/Profile' )
const User = require( '../../modals/User' )
const { check, validationResult, body } = require( 'express-validator/check' );
const request = require( 'request' );
const config = require( 'config' );
const { response } = require( 'express' );



router.get( auth, async ( req, res ) =>
{
    try
    {
        const profile = await Profile.findOne( { user: req.user.id } ).populate( 'user', [ 'name', 'avatar' ] );
        if ( !profile )
        {
            return res.status( 400 ).json( { msg: 'ther is no profile for this user' } );
        }
        res.json( profile );

    } catch ( err )
    {
        console.error( err.message );
        res.status( 500 ).send( 'Server Error' )
    }
} );



router.post( '/', [ auth, [
    check( 'title', 'Status is required' ).not().isEmpty(),
    check( 'description', 'Skills is required' ).not().isEmpty()
] ], async ( req, res ) =>
{
    const errors = validationResult( req );
    if ( !errors.isEmpty() )
    {
        return res.status( 400 ).json( { errors: errors.array() } );
    }

    const {
        title,
        description,
        createBy,
        createAt,
    } = req.body;

    //Get profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if ( title ) profileFields.title = title;
    if ( description ) profileFields.description = description;
    if ( createBy ) profileFields.createBy = createBy;
    if ( createAt ) profileFields.createAt = createAt;



    try
    {
        let profile = await Profile.findOne( { user: req.user.id } )
        if ( profile )
        {
            //Update
            profile = await Profile.findOneAndUpdate( { user: req.user.id },
                { $set: profileFields },
                { new: true } );

            return res.json( profile )
        }

        //create
        profile = new Profile( profileFields );
        await profile.save();
        res.json( profile );


    } catch ( err )
    {
        console.error( err.message );
        res.status( 500 ).send( 'Server Error' )
    }
} )





router.get( '/', async ( req, res ) =>
{
    try
    {
        const profiles = await Profile.find().populate( 'user', [ 'name', 'avatar' ] );
        res.json( profiles );
    } catch ( err )
    {
        console.error( err.message );
        res.status( 500 ).send( 'Server Error' );
    }
} )



router.get( '/user/:user_id', async ( req, res ) =>
{
    try
    {
        const profile = await Profile.findOne( { user: req.params.user_id } ).populate( 'user', [ 'name', 'avatar' ] );
        //check profile
        if ( !profile ) return res.status( 400 ).json( { msg: 'profile not found' } );
        res.json( profile );
    } catch ( err )
    {
        console.error( err.message );

        if ( err.kind == 'ObjectId' )
        {
            return res.status( 400 ).json( { msg: 'profile not found' } );
        }
        res.status( 500 ).send( 'Server Error' );
    }
} );


router.delete( '/', auth, async ( req, res ) =>
{
    try
    {

        await User.findOneAndDelete( { _id: req.user.id } );

        res.json( { msg: 'User Deleted' } );
    } catch ( err )
    {
        console.error( err.message );
        res.status( 500 ).send( 'Server Error' );
    }
} );
module.exports = router;

