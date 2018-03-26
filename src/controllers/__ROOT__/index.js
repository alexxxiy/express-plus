const api = require('api')();

api.all = async function(){
	this.context.end('FROM_ROOT!!!');
};

api.get = async function(ctx){
	ctx.end('FROM_GET_ROOT!!!');
};

module.exports = api;
