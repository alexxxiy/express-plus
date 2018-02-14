const mongoose = require('mongoose');
const crypto = require('crypto');

const {Schema} = mongoose;

const adminUserSchema = new Schema({
	login: {
		type: String,
		index: true,
		unique: 'this login name is existing',
		required: 'login is required',
	},
	passwordHash: {
		type: String,
		required: 'password is required',
	},
	salt: String,
	rights: {
		users: defaultRight(),
		goods: defaultRight(),
		brands: defaultRight(),
		categories: defaultRight(),
		subCategories: defaultRight(),
		test: defaultRight(),
	},
});

function defaultRight(){
	return {
		type: Schema.Types.Mixed,
		default: {r: false, w: false},
	};
}

adminUserSchema.virtual('password')
	.set(function(password){
		this.plainPassword = password;
		if(password){
			this.salt = crypto.randomBytes(128).toString('base64');
			this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha512').toString('hex');
		} else{
			this.salt = undefined;
			this.passwordHash = undefined;
		}
	})
	.get(function(){
		return this.plainPassword;
	});

adminUserSchema.methods.checkPassword = function(password){
	if(!password) return false;
	if(!this.passwordHash) return false;
	return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha512').toString('hex') === this.passwordHash;
};

const AdminUser = mongoose.model('admin_users', adminUserSchema);

module.exports = {
	AdminUser,
};
