const mongoose = require('mongoose');
const {Schema} = mongoose;


const DEFAULT_LOGO = 'https://vignette.wikia.nocookie.net/disney/images/d/d7/Avengers-logo.png/revision/latest';
const DEFAULT_COVER = 'https://www.ctvnews.ca/polopoly_fs/1.3156275.1478879536!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg';

const schema = new Schema(
	{
		id: {
			type: String,
			index: true,
			unique: 'This sub-category id is existing',
			required: 'ID is required',
		},
		name: {
			type: String,
			index: true,
			unique: 'This sub-category name is existing',
			required: 'Name is required',
		},
		slogan: {
			type: String,
			default: '',
		},
		status: {
			type: Boolean,
			default: false,
		},
		logo: {
			type: String,
			default: DEFAULT_LOGO,
		},
		cover: {
			type: String,
			default: DEFAULT_COVER,
		},
		types: {
			type: [String],
			default: [],
		},
		sort: {
			type: Number,
			default: 0,

		}
	});

const model = mongoose.model('sub-category', schema);

module.exports = {
	schema,
	model,
};
