const log = require('log')(module);


function create(model, data){
	const newRow = new model(data);

	return newRow.save()
		.then((res) => {
			return res;
		})
		.catch((err) => {
			log.e(err);
			return {error: err.message};
		});
}


module.exports = {
	create,
}
