
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String, 
  balance: Number, 
  savings: Number, 
  transactions: [{
    amount: Number, 
    description: String, 
    date: Date
  }]
});