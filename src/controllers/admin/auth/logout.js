const api = require('api')();
const log = require('log')(module);


api.all = async function(ctx){
	const {req, res, next} = ctx;
	const {username} = req.session.admin;

	req.session.admin = null;

	ctx.end({message: `User "${username}" logout`});
};

module.exports = api;
