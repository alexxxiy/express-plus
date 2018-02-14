const api = require('api')();

api.all = function(){
	this.context.send('FROM_EXAMPLE_DIR2!!!');
};

module.exports = api;
