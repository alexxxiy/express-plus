const fs = require('fs-extra');

const log = require('log')(module);
const consts = require('consts');
const form = require('lib/form');
const {model} = require('db/models/sub-categories');


const imageDir = `${consts.IMAGE_DIR}/sub-categories`;
const imageUrl = '/img/sub-categories';
const imageFileTypes = new Set(['logo', 'cover']);


function saveImageFile(subCategoryId, type, file){
	if(!file){
		log.e('saveCoverImage_0', 'No file for save');
		return undefined;
	}

	if(!imageFileTypes.has(type)){
		log.e('saveCoverImage_1', `Unknown file type: ${type}`);
		return undefined;
	}

	if(!subCategoryId){
		log.e('saveCoverImage_2', 'subCategoryName is required');
		return undefined;
	}

	const dir = `${imageDir}/${subCategoryId}`;

	fs.ensureDirSync(dir);

	const fileName = form.saveFile(file, dir, type);
	const url = `${imageUrl}/${subCategoryId}/${fileName}`;

	return url;
}

module.exports = {
	saveImageFile,
}
