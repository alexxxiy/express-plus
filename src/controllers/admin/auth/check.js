const api = require('api')();
const log = require('log')(module);


api.all = async function(ctx){
	const {req, res, next} = ctx;
	const login = req.session && req.session.admin;

	ctx.end({login});
};

module.exports = api;
