var express = require('express')
var router = express.Router()

var jwt = require('jsonwebtoken')

var jwtVerify = function (req, res, next) {
	try {
		var decoded_data = jwt.verfy(token, private_jwtKey);
		next();
	} catch {
		res.send('token is invalid');
	}
};

//post 내용에 token,email을 넘겨 주면 서버에서 검증한다.
router.post('/',function(req,res,next) {
	console.log("in authorize")
	var token = req.body.token
	//private_jwtKey를 어떻게 넘겨 받지? 비번을 항상 주기도 뭐하잔아.; 인식할수 있는 방법이 아이디를 보내야되나?
	//그거 보단, token을 클라이언트에 넘겨주는 경우 자체가 이메일, 비번을 제대로 입력했을때 잔아. 그러니까 이메일, 넘겨준 토큰을 모두 보내오면 그걸 검증하는 식으로 하면 될듯	
	var email = req.body.email

	jwt.verify(token, email, function(err,decoded) {
		if(err) {
			console.log(err)
			res.send({"success": "false"})
		} else {
			next();
			res.send({"success": "true"})
		}
	});
	/*
	if (verifyJsonWebToken(token)) {
	if isVerified {
		next();
	} else {
		res.send({"success": "false"})	
	}
	*/
});

function jwtAuthorize(token, email) {
	jwt.verify(token, email, function(err, decoded) {
		if(err) {
			console.log(err)
			return false
		} else {
			console.log("jwt verify success")
			return true
		}
	});
}


//파일 마지막에 이게 있어야 라우터로 사용이 가능하다.
module.exports = router;
