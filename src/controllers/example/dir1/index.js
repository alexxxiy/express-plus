const api = require('api')();

api.all = function(){
	this.context.end('FROM_EXAMPLE_DIR1!!!');
};

module.exports = api;
