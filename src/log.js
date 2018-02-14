/* eslint no-unused-vars: "off" */
const clrs = require('colors');

module.exports = (module) => {
	const l = new Logger(module);
	return l.logger;
};

class Logger {
	constructor(module){
		this.fileName = module.filename.replace(__dirname, '');
	}

	wrapper(type, ...colors){
		let {fileName} = this;
		let formatType = `[${type}]`;
		return function(...args){
			colors.forEach((color) => {
				fileName = (color && fileName[color]) || fileName;
				formatType = (color && formatType[color]) || formatType;
			});

			const logsArgs = [fileName, formatType].concat([].slice.call(args));
			console.log(...logsArgs);
		};
	}

	get logger(){
		const logger = {};
		logger.i = this.wrapper('I', 'yellow');
		logger.d = this.wrapper('D', 'bgBlue', 'white');
		logger.e = this.wrapper('E', 'red');
		logger.ok = this.wrapper('OK', 'green');
		return logger;
	}
}
