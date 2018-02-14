const to = require('await-to-js').to;

const api = require('api')();
const log = require('log')(module);
const synth = require('synth/sub-categories');

api.post = async function(ctx){
	const {req, res, next} = ctx;

	let [error, response] = await to(synth.create(req));

	if(error){
		log.e('create_subcategory_0', error);
		response = {error: error.toString()}
	}

	ctx.end(response);
};

module.exports = api;
