var nconf = require('nconf');
var path = require('path');
var fs = require('fs');

module.exports = function () {
  // prepare local config
  var pathLocalConfig = absPath(path.join('config', 'config.json'));
  if (fs.existsSync(pathLocalConfig)) {
    nconf.file(pathLocalConfig);
  }

  // prepare variables from environment
  for (var i in process.env) {
    if (i.indexOf('APP_') !== 0) continue;

    var code = i.substr(4).toLocaleLowerCase();

    // replace "__"
    code = code.replace(new RegExp('__', 'g'), ':');

    // replace "_"
    var symbolPosition = code.indexOf('_');
    while(symbolPosition >= 0) {
      var codeBefore = code.substr(0, symbolPosition);
      var codeAfter = code.substr(symbolPosition + 2);
      var codeSymbol = code.charAt(symbolPosition + 1);

      // replace "_a" -> "A"
      code = codeBefore + codeSymbol.toUpperCase() + codeAfter;

      symbolPosition = code.indexOf('_');
    }

    // set variable
    nconf.set(code, process.env[i]);
  }

  // prepare variables from package.json
  var pathPackageJson = absPath('package.json');
  if (fs.existsSync(pathPackageJson)) {
    var jsonPackage = require(pathPackageJson);
    nconf.set('sources:version', jsonPackage.version);
  }

  return nconf;
};
