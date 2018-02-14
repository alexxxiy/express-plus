const api = require('api')();
const log = require('log')(module);


api.secure.baseAdminWrite = 'subCategories';

api.all = async function(ctx){
	const {req, res, next, params, metaParams} = ctx;
	const method = this.getMethod();

	if(!method){
		ctx.end({error: 'create, read, update or delete'}, 400);
		return;
	}

	next();
};


module.exports = api;
