const fs = require('fs-extra');
const formidable = require('formidable');
const mime = require('mime-types');
const Promise = require('bluebird');

const log = require('log')(module);


const form = new formidable.IncomingForm();


function parse(req){
	return Promise.promisify(form.parse, {context: form, multiArgs: true})(req)
		.catch((err) => {
			log.e('Form_parse_0', err.toString());
			throw err;
		})
		.then(([data, files]) => {
			const json = data.json || '{}';
			const fields = JSON.parse(json);
			return {fields, files};
		})
		.catch((err) => {
			log.e('Form_parse_error');
		});
}

function saveFile(file, dir, name){
	if(!file){
		log.e('saveLogoImage_0', 'No file for save');
		return null;
	}

	const fileName = `${name}.${mime.extension(file.type)}`;

	const path = `${dir}/${fileName}`;

	fs.renameSync(file.path, path);
	log.ok(`file ${path} saved`);

	return fileName;
}

module.exports = {
	parse,
	saveFile,
};
