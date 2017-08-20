var request = require('request');
var Sequelize = require('sequelize');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var dbClient = function() {
	
	return {
        /**
         * Module connect to Client DB. (Init session-store module, ..., etc.)
         * @param app - express instance
         * @param configs - object {
		 * 		name: '',
		 * 		user: '',
		 * 		password: '',
		 * 		host: '',
		 * 		protocol: '',
		 * 	}
         */
		connect: function(app, configDB, configSession, callback) {
			var orm = new Sequelize(configDB.name, configDB.user, configDB.password, {
				host: configDB.host,
				dialect: configDB.protocol,
				define: {
					charset: 'utf8',
					collate: 'utf8_general_ci'
				}
			});		
			
			app.use(cookieParser());
			var SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
			
			// init sequelize sessions
			var instSequelizeStore = new SequelizeStore({db: orm})
			instSequelizeStore.sync().then(function(){ // recreate table on each server start
				app.use(expressSession({
					store: instSequelizeStore,
					resave: false,
					saveUninitialized: true,
					secret: configSession.secret,
					key: configSession.key,
					cookie: configSession.cookie
				}));
				
				callback(orm);
			}); 
			
			return orm;
		}
	}
}();


module.exports = {	
	dbClient: dbClient
};
