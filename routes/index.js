var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		console.log("THIS IS REQ.USER" ,req.user);		
		res.render('home', { user: req.user });
	});

	router.get('/transactions', isAuthenticated, function(req, res){
		console.log("THIS IS REQ.USER" ,req.user);		
		res.render('transactions', { user: req.user });
	});

	router.get('/accounts', isAuthenticated, function(req, res){
		console.log("THIS IS REQ.USER" ,req.user);		
		res.render('accounts', { user: req.user });
	});

	router.post('/deposit', isAuthenticated, function(req, res) {		
		console.log("THIS IS REQ.BODY" ,req.body);		
		console.log("THIS IS REQ.USER" ,req.user);		
		req.user.balance = /*Math.round(*/parseFloat(req.user.balance) + parseFloat(req.body.deposit) /** 100) / 100 ; */
		req.user.transactions.push({amount: req.body.deposit, description: 'deposit into checking', date: Date.now()} )
		req.user.save(function(err, savedUser){
      res.send(savedUser);
		});
		res.redirect('/home');
	});

	router.post('/withdraw', isAuthenticated, function(req, res) {		
		console.log("THIS IS REQ.BODY" ,req.body);		
		console.log("THIS IS REQ.USER" ,req.user);				
		req.user.balance = /*Math.round(*/parseFloat(req.user.balance) - parseFloat(req.body.withdraw) /** 100) / 100 ; */
		req.user.transactions.push({amount: req.body.withdraw, description: 'withdraw from checking', date: Date.now()} )
		req.user.save(function(err, savedUser){
      res.send(savedUser);
		});
		res.redirect('/home');
	});

	router.post('/depositSave', isAuthenticated, function(req, res) {		
		console.log("THIS IS REQ.BODY" ,req.body);		
		console.log("THIS IS REQ.USER" ,req.user);		
		req.user.savings = /*Math.round(*/parseFloat(req.user.savings) + parseFloat(req.body.depositSave) /** 100) / 100 ; */
		req.user.transactions.push({amount: req.body.depositSave, description: 'deposit into savings', date: Date.now()} )
		req.user.save(function(err, savedUser){
      res.send(savedUser);
		});
		res.redirect('/home');
	});

	router.post('/withdrawSave', isAuthenticated, function(req, res) {		
		console.log("THIS IS REQ.BODY" ,req.body);		
		console.log("THIS IS REQ.USER" ,req.user);				
		req.user.savings = /*Math.round(*/parseFloat(req.user.savings) - parseFloat(req.body.withdrawSave) /** 100) / 100 ; */
		req.user.transactions.push({amount: req.body.withdrawSave, description: 'withdraw from savings', date: Date.now()} )
		req.user.save(function(err, savedUser){
      res.send(savedUser);
		});
		res.redirect('/home');
	});


	router.post('/checkSave', isAuthenticated, function(req, res) {		
		console.log("THIS IS REQ.BODY" ,req.body);		
		console.log("THIS IS REQ.USER" ,req.user);		
		req.user.balance = /*Math.round(*/parseFloat(req.user.balance) - parseFloat(req.body.checkSave) /** 100) / 100 ; */
		req.user.savings = /*Math.round(*/parseFloat(req.user.savings) + parseFloat(req.body.checkSave) /** 100) / 100 ; */
		req.user.transactions.push({amount: req.body.save, description: 'transfer from checking to savings', date: Date.now()} )
		req.user.save(function(err, savedUser){
      res.send(savedUser);
		});
		res.redirect('/home');
	});

	router.post('/saveCheck', isAuthenticated, function(req, res) {		
		console.log("THIS IS REQ.BODY" ,req.body);		
		console.log("THIS IS REQ.USER" ,req.user);		
		req.user.balance = /*Math.round(*/parseFloat(req.user.balance) + parseFloat(req.body.saveCheck) /** 100) / 100 ; */
		req.user.savings = /*Math.round(*/parseFloat(req.user.savings) - parseFloat(req.body.saveCheck) /** 100) / 100 ; */
		req.user.transactions.push({amount: req.body.save, description: 'transfer from checking to savings', date: Date.now()} )
		req.user.save(function(err, savedUser){
      res.send(savedUser);
		});
		res.redirect('/home');
	});



	// router.post('/account/deposit', isAuthenticated, function(req, res) { });
	
	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// router.get('/pets', isAuthenticated, function(req, res){
		
	// })

	return router;
}





