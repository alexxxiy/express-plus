/* global suite test */
const {expect} = require('chai');
const {MongoClient} = require('mongodb');
const configMongo = require('config/mongodb');


suite('DataBase tests', () => {
	test('mongodb connection', (done) => {
		const {user, database, password, host, port} = configMongo;
		const url = `mongodb://${user}:${password}@${host}:${port}/${database}`;

		// Use connect method to connect to the Server
		MongoClient.connect(url, (err, db) => {
			expect(err).to.equal(null);
			console.log('Connected correctly to server');

			db.close();
			done();
		});
	});

	test('example_1', (done) => {
		expect('value_1').to.equal('value_1');
		done();
	});
});
