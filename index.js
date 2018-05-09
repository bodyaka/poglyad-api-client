var path = require('path');
var ApiClient = require('./ApiClient');
var Environment = require('./Environment');
var Config = require('./Config');

module.exports = function (baseDir) {
  //Hack for load custom modules through relative path
  global.__base_dir = baseDir;
  global.absPath = function (_path) {
    return path.join(__base_dir, _path);
  };

  global.requireRel = function (file) {
    return require(abs_path(file));
  };

  return {
    ApiClient: ApiClient,
    Environment: Environment,
    Config: Config,
  };
}
