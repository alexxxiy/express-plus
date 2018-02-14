const api = require('api')();
const log = require('log')(module);
const types = require('types/admin');


api.all = async function(ctx){
	const {req, res, next, metaParams} = ctx;
	const loggedIn = req.session.admin;
	const isLoginRequest = this.pathCheck('^auth$', '^login$');
	const method = this.getMethod();

	if(isLoginRequest){
		next();
		return;
	}

	if(!loggedIn){
		ctx.end({error: 'You need to log in'}, 401);
		return;	
	}

	if(!method){
		ctx.end(types.getLoginResponse(req.session.admin));
		return;
	}

	next();
};


module.exports = api;
