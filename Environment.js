var request = require('request');

module.exports = {
	init: function() {
		var shell = require("shelljs");
		var envVar = process.env.OPENSHIFT_REPO_DIR;
		shell.exec("echo RepoEnv: " + envVar);
		shell.exec("HOME=$OPENSHIFT_REPO_DIR bower install");
	}
}
