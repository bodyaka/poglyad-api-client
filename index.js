var request = require('request');

var _apiDomain;

var poglyadApiClient = function(domain){
	_apiDomain = domain;
};

poglyadApiClient.request = function(method, url, params, callback){
	if(!_apiDomain) throw new Error('Module poglyad-api-client not initialised correctly. "apiDomain" must be passed. See more at https://github.com/bodyaka/poglyad-api-client/blob/master/README.md');
	
	params = params || {};
	callback = callback || function(){};
	
	var options = {
		method: method,
		url: 'http://' + _apiDomain + '/' + url,
		json: true
	};
	
	if(method.toLowerCase() == 'get'){
		options.qs = params;
	}else{
		options.body = params;
	}
	
	request(options, callback);
};

module.exports = poglyadApiClient;
