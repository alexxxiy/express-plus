const to = require('await-to-js').to;

const log = require('log')(module);
const dal = require('dal/admin');


async function create(user){
	const {login, password} = user;

	const [error, response] = await to(dal.create(user))

	if(error){
		log.e('create_0', error);
		return {error: error.toString()};
	}

	if(response.error){
		log.e('create_0', response.error);
		return response;
	}

	return {login, message: 'SUCCESS: User created'};
}


async function readByLogin(login){
	const [error, response] = await to(dal.readRowByKeyValue('login', login));

	if(error){
		log.e('getUserByLogin_0', error);
		return {error: error.toString()};
	}

	return response;
}


module.exports = {
	create,
	readByLogin,
};
