const to = require('await-to-js').to;

const api = require('api')();
const log = require('log')(module);
const synth = require('synth/admin');


api.all = async function(ctx){
	const {req, res, metaParams, params, next} = ctx;
	const {login, password} = params;
	const method = this.getMethod();

	let response;
	let error;

	if(method === 'create'){
		if(!login || !password){
			ctx.end({error: 'user params is missing (login or/and password)', code: 'PARAMS_MISSING'}, 400);
			return;
		}

		[error, response] = await to(synth.user.create({login, password}));
	} else if(method === 'read'){
		if(login){
			[error, response] = await to(synth.user.readByLogin(login));
		}

	}

	if(error){
		log.e(error);
		response = {error: error.toString()};
	}

	ctx.end(response);
};

module.exports = api;
