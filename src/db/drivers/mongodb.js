const log = require('log')(module);
const mongoose = require('mongoose');
const mongoConfig = require('config/mongodb');

const {user, database, password, host, port} = mongoConfig;
const {PROD, DEV, TEST, ENV} = require('env');
// const url = `mongodb://${user}:${password}@${host}:${port}/${database}`;
const url = `mongodb://${host}:${port}/${database}`;


mongoose.Promise = Promise; // Просим Mongoose использовать стандартные Промисы
mongoose.set('debug', DEV); // Просим Mongoose писать все запросы к базе в консоль. Удобно для отладки кода

const options = {
	useMongoClient: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	// bufferMaxEntries: 0
	user,
	pass: password,
};


// Подключаемся к базе database на локальной машине. Если базы нет, она будет создана автоматически.
module.exports = mongoose.connect(url, options)
	.catch((err) => {
		log.e('Error MongoDB connection', err.toString());
		throw err;
	})
	.then((connect) => {
		log.ok('MongoDB Connection');
		return connect;
	});

