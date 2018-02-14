const log = require('log')(module);
const api = require('api')();

api.all = function(ctx){
	const {req, res, next} = ctx;

	ctx.end('FROM_LOGIN!!!');
};

module.exports = api;
