const log = require('log')(module);


function deleteRowById(model, id){
	return model.findOneAndRemove({id})
		.catch((err) => {
			log.e('deleteRow_0', err.toString());
			throw err;
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			log.e('deleteRow_2', err.toString());
			return {error: err.toString()};
		});
}

module.exports = {
	deleteRowById,
}
