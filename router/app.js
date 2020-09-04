//기본 라우팅, 디비 연결
//디비 요청 응답은 다른 파일에서 하자.
var express = require('express')

var app = express()

var listener = app.listen(3000, function() {
	console.log("start!, express server on port %d", listener.address().port);
});


/*sequelize\app.js*/
console.log("sequelize start")
var sequelize = require('../models/index').sequelize
sequelize.sync()
console.log("sequelize end")




app.get('/createId', function(req,res) {
	console.log('createId req')
	const {Person} = require('../models')
	/*req

	*/
	var id = 1
	var name = "김동환"
	var age = 27
	//tmp
	var email = "asdf3@naver.com"
	var pwd = "1234"

	Person.findOne({
		where: {
			email: email,
		}
	})
	.then( result => {
		if (result === null) {
			Person.create({
				id : id,
				name: name,
				age: age,
				email: email,
				pwd: pwd
			})
			.then( result => {
				res.json({"success": "true"})
			})
			.catch(err => {
				console.log(err)
			})			
		} else {
			console.log("email already exists")
			res.json({"success": "false"})
		}
	})
	.catch(err => {
		console.log(err)
	})
})

app.get('/login', function(req,res){
	console.log("login called")
	const {Person} = require('../models')
	//tmp
	var email = "asdf2@naver.com"
	var pwd = "1234"
	//find by id, pwd -> return true
	
	Person.findOne({
		where: {
			email: email,
			pwd: pwd,
		}
	})
	.then( result => {
		if (result === null) {
			res.json({"success": "false"})
		} else {
			res.json({"success": "true"})
		}
	})
	.catch(err => {
		console.log(err)
	})
});










