# poglyad-api-client

##How to use

First of all, this module must be initialized. Better if it implemented in entry point of NodeJS project:
```js
require('poglyad-api-client')('some.api.poglyad.org');
```

And then, simply require module in the necessary module, and use:
 
```js
var poglyadApiClient = require('poglyad-api-client');

poglyadApiClient.request('post', 'module/method', {
	property1: 'value1',
	property2: 'value2',
	property3: 'value3'
}, function(err, res, body){
	
	// callback functionality
	// ...
	
});
```

##Methods:
### request(method, path, parameters, callback)
  * method(string) - method of http request get|post|put|delete
  * path(string) - path to requested data
  * parameters(object) - additional parameters for request. If method=='get', then parameters puts to query string
  * callback(err, res, body)(function) - callback function for handle result  