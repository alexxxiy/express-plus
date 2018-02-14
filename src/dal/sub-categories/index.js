const Promise = require('bluebird');
const pathExists = require('path-exists')

const log = require('log')(module);
const create = require('./create');
const read = require('./read');
const update = require('./update');
const del = require('./delete');

const {model} = require('db/models/sub-categories');

const baseDal = require('dal/_base');

const base = baseDal.getAllBaseMethods(model);


module.exports = {
	...base,
	...create,
	...read,
	...update,
	...del,
}
