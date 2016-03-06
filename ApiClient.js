var request = require('request');
var url = require('url');
var httpProxy = require('http-proxy');

var _apiDomain;
var _apiPort;
var _accessToken;

var poglyadApiClient = function(options){
	_apiDomain 		= options.apiDomain || '';
	_apiPort 		= options.apiPort || '';
	_accessToken 	= options.accessToken || '';
	
	return poglyadApiClient;
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
poglyadApiClient.proxy = function(req, res, next){
	var url = 'http://' + _apiDomain + ':' + _apiPort;
	
	var proxy = httpProxy.createProxyServer({
		target: url,
		changeOrigin: true
	});
	proxy.web(req, res);
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
	request(options, function(err, res, data) {
		if(data && data.error) {
			return callback(new Error('' + data.error.code + ':' + data.error.message), res, data);
		} else if(err) {
			return callback(err)
		} else if(res.statusCode >= 300) {
			return callback(new Error('' +res.statusCode + ':' + res.body), res, data);
		}
		
		callback(err, res, data);
	})
};

module.exports = poglyadApiClient;
