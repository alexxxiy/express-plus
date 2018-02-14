const api = require('api')();

api.all = function(){
	const response = this.context.metaParams;
	this.context.end(response);
};

// api.get = function(){
// 	let response = this.context.metaParams;
//     this.context.end('FROM GET');
// }

module.exports = api;
