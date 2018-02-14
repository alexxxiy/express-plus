const api = require('api')();

api.all = function(){
	this.context.end('FROM_ROOT!!!');
};

api.get = function(){
	this.context.end('FROM_GET_ROOT!!!');
};

module.exports = api;
