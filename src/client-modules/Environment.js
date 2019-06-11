var request = require('request');
var Sequelize = require('sequelize');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var dbClient = function() {

  return {
    /**
     * Module connect to Client DB. (Init session-store module, ..., etc.)
     * @param configDB - configuration of DB
     * @param configSession - configuration of Session
     * @param callback
     */
    connect: function(configDB, configSession, callback) {
      var orm = new Sequelize(configDB.name, configDB.user, configDB.password, {
        host: configDB.host,
        dialect: configDB.protocol,
        define: {
          charset: 'utf8',
          collate: 'utf8_general_ci'
        }
      });

      Application.instance.use(cookieParser());
      var SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

      // init sequelize sessions
      var instSequelizeStore = new SequelizeStore({db: orm})
      instSequelizeStore.sync().then(function(){ // recreate table on each server start
        Application.instance.use(expressSession({
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
