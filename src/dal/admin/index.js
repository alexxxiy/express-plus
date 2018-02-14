const log = require('log')(module);
const {AdminUser} = require('db/models/admin');

const baseDal = require('dal/_base');

const base = baseDal.getAllBaseMethods(AdminUser);


module.exports = {
	...base,
};
