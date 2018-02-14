const fs = require('fs-extra');
const glob = require('glob');

const log = require('log')(module);
const consts = require('consts');
const form = require('lib/form');
const {model} = require('db/models/sub-categories');


const imageDir = `${consts.IMAGE_DIR}/sub-categories`;
const imageUrl = '/img/sub-categories';


function deleteImageFile(subCategoryId, type){
	if(!subCategoryId || !type){
		log.e('deleteImageFiles_0', 'subCategoryName and type is required');
		return undefined;
	}

	const template = `${imageDir}/${subCategoryId}/${type}.*`;
	const files = glob.sync(template);

	files.forEach(file => fs.removeSync(file));
}

function deleteImageFiles(subCategoryId){
	if(!subCategoryId){
		log.e('deleteImageFiles_1', 'subCategoryName and type is required');
		return undefined;
	}

	const dir = `${imageDir}/${subCategoryId}`;

	fs.removeSync(dir);
}

module.exports = {
	deleteImageFile,
	deleteImageFiles,
}
