const express = require('express')
const app = express()
const authRoutes = require('./routes/auth-routes.js')
const profileRoutes = require('./routes/profile-routes')

const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

//something just like this

//Home route
app.get('/', (req, res) => {
	res.render('home', { user: req.user })
})


//set up view engine
app.set('view engine', 'ejs')

//cookie session 
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]

}))

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('Connected to mongoDB')
})


//set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)



//listen to port
app.listen(3000, (req, res) => {
	console.log('App is listening for requests on port 3000')
})