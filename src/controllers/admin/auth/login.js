/* eslint-disable no-underscore-dangle */
const api = require('api')();
const log = require('log')(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // локальная стратегия авторизации
const synth = require('synth/admin');


api.all = async function(ctx){
	const {req, res, next} = ctx;

	req.session.admin = null;

	passport.use(new LocalStrategy({
		usernameField: 'admin_name',
		passwordField: 'admin_pass',
		session: false,
	}, (login, password, done) => {
		synth.user.readByLogin(login)
			.then((user) => {
				if(user && user.checkPassword(password)){
					done(null, user);
					return;
				}

				done();
			})
			.catch(err => done(err));
	}));

	passport.authenticate('local', (err, user, info) => {
		if(err){
			log.e('admin_login_0', err);
			ctx.end({error: true, message: 'Error while login', info});
			return;
		}

		if(!user){
			req.session.admin = null;
			ctx.end({error: true, message: 'Fail login'});
			return;
		}

		const admin = {
			username: user.login,
			rights: user.rights,
		};

		req.session.admin = admin;

		ctx.end(admin);
	})(req, res, next);
};

module.exports = api;
