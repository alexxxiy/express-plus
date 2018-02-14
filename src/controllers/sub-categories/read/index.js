const to = require('await-to-js').to;

const api = require('api')();
const log = require('log')(module);
const synth = require('synth/sub-categories');

api.all = async function(ctx){
	const {req, res, next, params, metaParams} = ctx;
	const method = this.getMethod();
	let response;
	let error;

	if(method === 'rowbyid'){
		// /api/sub-categories/read/rowbyid/${id}
		let id = metaParams[1];
		[error, response] = await to(synth.readById(id));
	} else{
		// /api/sub-categories/read/
		[error, response] = await to(synth.readAll());
	}
	
	if(error){
		log.e(error);
		response = {error: error.toString()};
	}

	ctx.end(response);
};

module.exports = api;
