var path = require('path');
var ApiClient = require('./ApiClient');
var Environment = require('./Environment');
var Config = require('./Config');

module.exports = {
  ApiClient: ApiClient,
  Environment: Environment,
  Config: Config,
  initialize: function (baseDir) {
    //Hack for load custom modules through relative path
    global.__base_dir = baseDir;
    global.getAbsolutePath = function (_path) {
      return path.join(__base_dir, _path);
    };

    global.requireRel = function (file) {
      return require(getAbsolutePath(file));
    };
  },
};
