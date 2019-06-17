const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20');

const FacebookStrategy = require('passport-facebook');

const keys = require('./keys')
const User = require('../models/user-model')
const mongoose = require('mongoose')

//to store the information in cookies
passport.serializeUser((user, done) => {
	done(null, user.id);

})

//passport deserialize user ('which takes the ID cookie comes back with the ID')
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);

	})


})





//set up passport with google
passport.use(new GoogleStrategy({
	//options for the strategy
	callbackURL: '/auth/google/redirect',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret


}, (accessToken, refreshToken, profile, done) => {
	//check if user exists in db
	console.log(profile)
	User.findOne({
		googleId: profile.id

	}).then((currentUser) => {
		if (currentUser) {
			//already have the user
			console.log('user from google is ', currentUser)
			done(null, currentUser)

		} else {
			//if not create user in db
			new User({
				googleId: profile.id,
				name: profile.displayName,
				thumbnail: profile.json.picture

			}).save()
				.then((newUser) => {
					console.log('new user created with google id' + newUser);
					done(null, newUser)
				})

		}

	})





	//passport call back function
	console.log('passport call back function for google fired')
	// console.log(profile)

}))


//set up passport with facebook
passport.use(new FacebookStrategy({
	callbackURL: '/auth/facebook/redirect',
	clientID: keys.facebook.clientID,
	clientSecret: keys.facebook.clientSecret

}, (accessToken, refreshToken, profile, done) => {
	//check if user exists in db
	console.log(profile)
	User.findOne({
		facebookId: profile.id

	}).then((currentUser) => {
		if (currentUser) {
			//user already exists
			console.log('user from facebook is ', currentUser)
			done(null, currentUser)

		} else {
			//if not create user in db
			new User({
				facebookId: profile.id,
				name: profile.displayName,

			}).save()
				.then((newUser) => {
					console.log('New user created with facebook id' + newUser);
					done(null, newUser)
				})

		}

	})



	//passport call back function
	console.log('passport call back function for facebook fired');
	// console.log(profile)


}))