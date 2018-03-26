/* eslint global-require: "off" */
const to = require('await-to-js').to;
const httpStatus = require('http-status');
const glob = require('glob');
const pathModule = require('path');
const log = require('log')(module);


const routes = [];

const CONTROLLERS_DIR = `${__dirname}/controllers`;
const ROOT_DIR = '/__ROOT__';


class Context {
	constructor(request, response, next){
		this.req = request;
		this.res = response;
		this.next = next;
		this.path = request.path.match(/([^/]+)/ig);
		this.params = Object.assign({}, request.query, request.body);
	}

	end(...args){
		const body = args && args[0] || {msg: 'empty response'};
		const status = args && args[1] || httpStatus.OK;

		this.res.status(status).send(body);
	}
}

class Route {
	constructor(location, handler){
		this.location = location;
		this.handler = handler;
	}
}

function newRoute(location){
	const handler = require(`${__dirname}/controllers${location}`);

	const wrapHandler = async (request, response, next) => {
		const context = new Context(request, response, next);

		if(!handler.all){
		  const msg = `Service ${location} not implemented`;
			log.e('newRoute_0', msg);
			context.end({error: msg}, httpStatus.NOT_FOUND);
			return;
		}

		context.location = location;

		if(location !== ROOT_DIR){
			const stringExceptPath = context.path.join('/').replace(location.substr(1), '');
			context.metaParams = stringExceptPath.substr(1).split('/').filter(p => p);
		}

		const [error] = await to(handler.init(context));

		if(error){
			log.e('newRoute_1', error);
		}
	};

	const regExpLocation = location !== ROOT_DIR ? new RegExp(`^${location}(/|$)`) : '';

	routes.push(new Route(regExpLocation, wrapHandler));
}

function getControllers(src){
	let pathes = glob.sync('/**/*.js', {root: src});
	pathes = pathes.map((path) => {
		if(path.substr(-8) === 'index.js'){
			return path;
		}

		return path.replace(/\.js$/, '/index.js');
	});

	const services = pathes.map(dir => `/${pathModule.dirname(pathModule.relative(src, dir))}`);
	services.sort();

	return services;
}

// Add routes
getControllers(CONTROLLERS_DIR).forEach((apiModule) => {
	newRoute(apiModule);
});

module.exports = routes;
