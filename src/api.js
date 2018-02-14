const to = require('await-to-js').to;

const log = require('log')(module);
const secur = require('secur');

class API{
	constructor(name){
		this.name = name;

		this.secure = {};
	}

	async init (context){
		this.context = context;
		let error;

		let check = Object.keys(this.secure).some((policy) => {
			if(!this.secure[policy]){
				return false;
			}

			let securPolicy = null;

			if(typeof this.secure[policy] === 'function'){
				return this.secure[policy].call(this, context);
			} else if(secur[policy]){
				return secur[policy].call(this, context, this.secure[policy]);
			}

			return false;
		});

		if(check){
			return;
		}


		const httpMethod = context.req.method.toLowerCase();

		let method = 'all';

		if(this[httpMethod]){
			method = httpMethod;
		}

		const controller = this[method];

		[error] = await to(controller.call(this, context));

		if(error){
			log.e('API_init_1', error);
			this.context.end({error: `Unhandled exception: ${error.toString()}`});
		}
	}

	// Redefine this method
	all(){
		const defaultResponse = {error: true, message: `API "${this.context.location}" (${this.context.req.method}) is not implemented`};
		this.context.end(defaultResponse);
	}

	getMethod(){
		const {metaParams} = this.context;

		return metaParams && metaParams[0] && metaParams[0].toLowerCase() || '';
	}

	checkRight(checker){
		const req = this.context.req;
		const rights = req.session && req.session.admin && req.session.admin.rights;

		if(!rights){
			return false;
		}

		return checker(rights);
	}

	pathCheck(...pathParts){
		return pathParts.every((pathPart, idx) => new RegExp(pathPart, 'i').test(this.context.metaParams[idx]));
	}
}

module.exports = function(name){
	return new API(name);
};
