const log = require('log')(module);


function updateRowById(model, id, data){
	delete data.id;

	return model.findOneAndUpdate({id}, data)
		.catch((err) => {
			log.e('updateRowById_0', err.toString());
			throw err;
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			log.e('updateRowById_1', err.toString());
			return {error: err.toString()};
		});
}

module.exports = {
	updateRowById,
}
