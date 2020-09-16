//기본 라우팅, 디비 연결
//디비 요청 응답은 다른 파일에서 하자.
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var listener = app.listen(3001, function() {
	console.log("start!, express server on port %d", listener.address().port);
});


/*sequelize\app.js*/
console.log("sequelize start2");
var sequelize = require('../models/index').sequelize
sequelize.sync()


app.post('/createId', function(req,res) {
	console.log('createId req')
	const {Person} = require('../models')
	
	var id = req.body.id
	var name = req.body.name
	var age = req.body.age
	var email = req.body.email
	var pwd = req.body.pwd

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
				res.json({"success": true})
			})
			.catch(err => {
				console.log(err)
			})			
		} else {
			console.log("email already exists")
			res.json({"success": false})
		}
	})
	.catch(err => {
		res.json({"success": false})
		console.log(err)
	})
})

app.post('/login', function(req,res){
	console.log("login called")
	const {Person} = require('../models')
	var email = req.body.email
	var pwd = req.body.pwd
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
			res.json({"success": false})
		} else {
			res.json({"success": true})
		}
	})
	.catch(err => {
		res.json({"success": false})
		console.log(err)
	})
});
/*
{
	//"id":"1",
	"writer":"nick",
	"title":"first article",
	//"viewCnt":"",
	"contents":"this is a first article of our homepage ,gg",
	//"dates":"",
}
*/

app.post('/frontQABoard/create', function(req,res){
	console.log("request accepted")
	console.log(req.body)

	var writer = req.body.writer
	var title = req.body.title
	var contents = req.body.contents
	/*should cal viewCnt and page in this server*/
	var viewCnt = 0;
	var page = 1;

	console.log("/frontQABoard/create called")
	const {FrontQABoard} = require('../models')

	FrontQABoard.create({
		writer: writer,
		title: title,
		viewCnt: viewCnt,
		contents: contents,
		page: page
	})
	.then( result => {
		res.json({"success": true})
	})
	.catch(err => {
		res.json({"success": false})
		console.log(err)
	})	
})


/*
	{
		"page": 1
	}
*/
//list의 일부를 페이지 별로 받고 저장해야 되네. 디비 구조를 다시 만들자.
app.post('/frontQABoard/getList',function(req,res){
	console.log('request accepted getList')
	const {FrontQABoard} = require('../models')
	var page = req.body.page

	FrontQABoard.findAll({
		where: {
			page: page
		}
	})
	.then( result => {
		console.log(result)
		res.json(result)
	})
	.catch(err => {
		res.json({"success": false})
		console.log(err)
	})
})

//token creation
var jwt = require('jsonwebtoken')
var private_jwtKey = '1234'
var token = jwt.sign({ sub: 'sjk5766', exp: Math.floor(Date.now() / 1000) + 600 }, private_jwtKey);
console.log(token)
//give token to app, when returned then verify and proceed

var jwtVerify = function (req, res, next) {
	//verify 실패시 error
	try {
		var decoded_data = jwt.verify(token,private_jwtKey);
		console.log("in jwtVerify")
		console.log(decoded_data.sub)
		next();
	} catch {
		res.send('token is invalid');
	}
};


app.use( jwtVerify);
app.get('/jwtVerifyTest', function(req, res) {
	res.send(jwt.verify(token,private_jwtKey));
});







