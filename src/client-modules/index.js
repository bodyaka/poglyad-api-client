var path = require('path');
var ApiClient = require('./ApiClient');
var Environment = require('./Environment');
var Config = require('./Config');

// Application root __dirname
var _rootDir;

/**
 * Get absolute path relative to application root
 * @param _path
 * @return {string}
 * @constructor
 */
global.GetAbsolutePath = function (_path) {
  return path.join(_rootDir, _path);
};

/**
 * Hack for loading custom modules through relative path
 *
 * @param file - file name
 */
global.requireRel = function (file) {
  return require(GetAbsolutePath(file));
};

module.exports = {
  ApiClient: ApiClient,
  Environment: Environment,
  Config: Config,

  /**
   * Initialize Poglyad org application
   *
   * @param baseDir
   *
   * @return {}
   */
  initialize: function (baseDir) {
    var App = {};

    // set __dirname
    _rootDir = baseDir;

    // initalize application config
    App.config = Config();

    return App;
  },
};
