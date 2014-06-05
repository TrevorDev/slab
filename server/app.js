var render = require('./lib/render')
var jsonResp = require('./lib/jsonResp')
var config = require('./lib/config')
var sessionHelper = require('./lib/sessionHelper')
var logger = require('koa-logger')
var router = require('koa-router')
var serve = require('koa-static')
var session = require('koa-session')
var views = require('co-views')
var parse = require('co-body')
var koa = require('koa')
var swig = require('swig')
var https = require('https')
var http = require('http')
var request = require('request');
var fs = require('fs')
var cors = require('koa-cors');
var thunkify = require('thunkify');
var app = koa()

//REMOVE IN PRODUCTION??
swig.setDefaults(config.templateOptions)

//ROUTES
app.keys = [config.sessionSecret]
app.use(session())
app.use(jsonResp())
app.use(cors())
app.use(router(app))

//PAGE ROUTES
app.get('/', defaultPageLoad('index'))
app.post('/', handleEvent)
app.get('/public/*', serve('.'))


function *handleEvent(){
	var e = yield parse(this)
	if (e.type=="volume"){
		exec(/*'amixer -D pulse sset Master 5%+'*/"amixer -D pulse sset Master "+e.val+"%", function (error, stdout, stderr) {
			
		});
	}
	console.log("event")
	console.log(e)
	this.jsonResp(200, {test: "blah"})
}

//PAGE HANDLERS
function defaultPageLoad(pageName, requiresLogin) {
	return function *(){
		console.log(pageName)
		if(requiresLogin===true && !sessionHelper.isLoggedIn(this.session)){
			this.redirect('/login')
			return
		}

		var temp = sessionHelper.commonTemplate(this.session);
		this.body = yield render(pageName, temp)
	}
}

var server = http.createServer(app.callback())
server.listen(config.appPort);
console.log('Started ----------------------------------------------')




var io = require('socket.io')(server);

var exec = require('child_process').exec;

io.on('connection', function(socket){
	console.log("hits");
	/*exec('amixer -D pulse sset Master 5%+', function (error, stdout, stderr) {
		
	});*/
});