const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res) => {
	res.render('login', { user: req.user })
})


//auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	// res.send(req.user)
	res.redirect('/profile/')
})

//auth with facebook
router.get('/facebook', passport.authenticate('facebook', {

	scope: ['email']
}));

//callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
	// res.send(req.user)
	res.redirect('/profile/')
})


router.get('/logout', (req, res) => {
	//handle with passport
	req.logout();
	res.redirect('/')
})

module.exports = router;