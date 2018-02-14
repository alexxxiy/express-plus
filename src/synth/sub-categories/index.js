const _ = require('lodash');
const to = require('await-to-js').to;

const log = require('log')(module);
const dal = require('dal/sub-categories');
const form = require('lib/form');


const DEFAULT_ERROR = 'SUB_CATEGORIES_ERROR';


async function create(req){
	const {fields, files} = await form.parse(req);
	const logoFile = files.logo;
	const coverFile = files.cover;

	if(logoFile){
		fields.logo = dal.saveImageFile(fields.id, 'logo', logoFile);
	}

	if(coverFile){
		fields.cover = dal.saveImageFile(fields.id, 'cover', coverFile);
	}

	const [error, response] = await to(dal.create(fields));

	if(error){
		log.e('create_subcategory_0', error);
		return {error: error.toString()};
	}

	return response;
}

async function readAll(req){
	let [error, response] = await to(dal.readAll());

	if(error){
		log.e('readAll_0', error.toString());
		return {error: error.toString()};
	}

	if(!response){
		log.e('readAll_1', 'Empty response');
		return {error: 'Empty response'};
	}

	response.forEach((row) => {
		row.sort = row.sort || Number.MAX_VALUE;
	});

	response = _.sortBy(response, ['sort', 'id']);;

	response.forEach((row) => {
		row.sort = (row.sort === Number.MAX_VALUE) && ' ' || row.sort;
	});

	return response;
}

async function readById(subCategoryId){
	let [error, response] = await to(dal.readRowById(subCategoryId));

	if(error){
		log.e('readById_0', `subCategoryId: ${subCategoryId}`, error.toString());
		return {error: error.toString()};
	}

	if(!response){
		let msg = `Sub category not found by id $(subCategoryId)`;
		log.e('readById_1', msg);
		return {error: msg};
	}

	return response;
}

async function updateById(subCategoryId, req){
	const {fields, files} = await form.parse(req);
	const logoFile = files.logo;
	const coverFile = files.cover;


	if(logoFile){
		dal.deleteImageFile(subCategoryId, 'logo');
		fields.logo = dal.saveImageFile(subCategoryId, 'logo', logoFile);
	}

	if(coverFile){
		dal.deleteImageFile(subCategoryId, 'cover');
		fields.cover = dal.saveImageFile(subCategoryId, 'cover', coverFile);
	}

	console.log('fields', fields);

	const response = await dal.updateRowById(subCategoryId, fields);

	return response;
}

async function deleteById(subCategoryId){
	let response = {};
	let error;

	if(!subCategoryId){
		let msg = 'rowById_0 Need "subCategoryId" argument';
		log.e(msg);
		return {error: msg};
	}

	[error, response] = await to(dal.deleteRowById(subCategoryId));

	if(error){
		log.e('rowById_1', `subCategoryId: ${subCategoryId}`, error);
		return {error: error.toString()};
	}

	dal.deleteImageFiles(subCategoryId);

	return response;
}

module.exports = {
	create,
	readAll,
	readById,
	updateById,
	deleteById,
};
