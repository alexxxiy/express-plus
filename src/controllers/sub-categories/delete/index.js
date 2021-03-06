const to = require('await-to-js').to;

const api = require('api')();
const log = require('log')(module);
const synth = require('synth/sub-categories');

api.all = async function(ctx){
	const {req, res, next, params, metaParams} = ctx;
	let response;
	let error;
	const method = this.getMethod();

	if(method === 'rowbyid'){
		// /api/sub-categories/delete/rowbyid/${id}
		let id = metaParams[1];
		[error, response] = await to(synth.deleteById(id));
	} else{
		// /api/sub-categories/delete/
		error = 'no defaultMetod';
	}
	
	// response = await synth.read(req);
	if(error){
		log.e(error);
		response = {error: error.toString()};
	}

	// ctx.end(response);
	ctx.end(response);
};

module.exports = api;
