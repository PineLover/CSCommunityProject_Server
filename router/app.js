//기본 라우팅, 디비 연결
//디비 요청 응답은 다른 파일에서 하자.
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var listener = app.listen(3000, function() {
	console.log("start!, express server on port %d", listener.address().port);
});


/*sequelize\app.js*/
console.log("sequelize start")
var sequelize = require('../models/index').sequelize
sequelize.sync()


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
	var viewCnt = 0;

	console.log("/frontQABoard/create called")
	const {FrontQABoard} = require('../models')

	FrontQABoard.create({
		writer: writer,
		title: title,
		viewCnt: viewCnt,
		contents: contents
	})
	.then( result => {
		res.json({"success": "true"})
	})
	.catch(err => {
		console.log(err)
	})	
})










