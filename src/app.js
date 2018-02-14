/* eslint no-unused-vars: "off" */
// NPM modules
const app = require('express')();
const requestIp = require('request-ip');
const colors = require('colors');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// Custom modules
const redisConf = require('config/redis');
const mongoose = require('db/drivers/mongodb');
const routes = require('routes');
const log = require('log')(module);
const {PROD, DEV, TEST, ENV} = require('env');

app.set('port', (PROD && 8090) || 3000);
app.set('trust proxy', 1); // trust first proxy

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(requestIp.mw()); // now allowed req.clientIp


// Session
const ONE_DAY = 86400;
const redisOptions = Object.assign({}, redisConf, {ttl: ONE_DAY});
const sessionOptions = {
	store: new RedisStore(redisOptions),
	resave: false,
	saveUninitialized: false,
	secret: 'lkdjlfjsdlkfjsdlckmsdlkmclsdkmvlsnflsnglsn',
	cookie: {},
};

if(PROD){
	// secure - обеспечивает отправку файлов cookie браузером только с использованием протокола HTTPS
	// sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

// for debug
app.use((req, res, next) => {
	next();
});

// Routes
routes.forEach(route => app.all(route.location, route.handler));

app.use((req, res, next) => {
	res.status(404);
	res.send({error: 'NOT_FOUND'});
});

// Server create
app.listen(app.get('port'), () => {
	const port = app.get('port').toString().yellow.underline;
	const msg = 'Server started on port '.yellow + port;
	log.i(msg);
});
