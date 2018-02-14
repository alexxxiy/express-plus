const log = require('log')(module);


function readAll(model){
	return model.find({})
		.then(res => res)
		.catch((err) => {
			log.e(err.message);
			return {error: err.message};
		});
}

function readRowById(model, id){
	return model.find({id})
		.then(res => res)
		.catch((err) => {
			log.e(err.message);
			return {error: err.message};
		});
}

function readRowByKeyValue(model, key, value){
	const search = {};
	search[key] = value;

	return model.findOne(search)
		.catch((err) => {
			log.e('Error', err.toString());
			throw err;
		})
		.then(res => res);
}

module.exports = {
	readAll,
	readRowById,
	readRowByKeyValue,
}
