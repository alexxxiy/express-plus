const create = require('./create');
const read = require('./read');
const update = require('./update');
const del = require('./delete');

const methods = {
	...create,
	...read,
	...update,
	...del,	
}

function getAllBaseMethods(model){
	return Object.keys(methods).reduce((res, name) => {
		res[name] = methods[name].bind(null, model)
		return res;
	}, {});
}

module.exports = {
	getAllBaseMethods,
}
