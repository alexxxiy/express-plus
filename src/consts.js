const PROJECT_ROOT = module.filename.split('/').slice(0, -3).join('/');
const IMAGE_DIR = `${PROJECT_ROOT}/img`;

module.exports = {
	PROJECT_ROOT,
	IMAGE_DIR,
};
