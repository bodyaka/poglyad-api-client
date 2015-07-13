var request = require('request');
var httpProxy = require('http-proxy');

var _apiDomain;
var _accessToken;

var poglyadApiClient = function(domain, accessToken){
	_apiDomain = domain;
	
	if(accessToken) poglyadApiClient.setAccessToken(accessToken);
};

/**
 * Set API accessToken for all requests
 * 
 * @param accessToken
 */
poglyadApiClient.setAccessToken = function(accessToken){
	_accessToken = accessToken;
};

/**
 * Config proxy
 * 
 * @param {
 * @param 	options.expressInstance
 * @param 	options.apiPath
 * @param 	options.apiDomain
 * @param }
 */
poglyadApiClient.proxy = function(options){
	if(!options.expressInstance || !options.apiPath || !options.apiDomain){
		console.log('Proxy parameters not valid');
		return false;
	}
	
	options.expressInstance.use(options.apiPath, function(req, res, next){
		var url = 'http://' + options.apiDomain + req.url;
		req.pipe(request(url)).pipe(res);
	});
	
	return true;
};


/**
 * Send request for configured API 
 * 
 * @param method
 * @param url
 * @param params
 * @param callback
 */
poglyadApiClient.request = function(method, url, params, callback){
	if(!_apiDomain) throw new Error('Module poglyad-api-client not initialised correctly. "apiDomain" must be passed. See more at https://github.com/bodyaka/poglyad-api-client/blob/master/README.md');
	
	params = params || {};
	callback = callback || function(){};
	
	var options = {
		method: method,
		url: 'http://' + _apiDomain + '/' + url,
		json: true
	};
	
	// handle token
	var accessToken = _accessToken;
	if(params.access_token){
		accessToken = params.access_token;
		delete params.access_token;
	}
	if(accessToken) options.headers = {'Authorization': 'Bearer ' + accessToken};
	
	// attach parameters to request
	if(method.toLowerCase() == 'get'){
		options.qs = params;
	}else{
		options.body = params;
	}
	
	// send request
	request(options, callback);
};

module.exports = poglyadApiClient;
