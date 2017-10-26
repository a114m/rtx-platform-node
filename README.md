# RTX Platform API support
This is beta version

## Installation
```
npm install rtx-platform --save
```

## Usage
### Initializing client

The constructor takes the following parameters:
* @param {string} baseUrl - (Required) base API URL, Ex. `'https://api.rtxplatform.com'`.
* @param {string} apiKey - (Required) RTX apiKey.
* @param {string} secretKey - (Required) RTX secretKey.

You can find auth info on: https://app.rtxplatform.com/account/developer-api

```
const RTXClient = require('rtx-platform');


let rtxClient = new RTXClient('https://api.rtxplatform.com/', '<your api_key>', 'your secret_key');
```
### Making request
`rtxClient.request` function is used to make API calls, it returns promise if no callBack function is passed, and takes the following paramaters:
* @param {string} method - (Required) HTTP method Ex. <'GET' | 'POST' | 'PUT' | 'UPDATE'>.
* @param {string} resourcePath - (Required) Ex. '/pops-api/v1/creatives'.
* @param {object} queryParams - (Optional) Additional URL query parameters.
* @param {object/string} body - (Optional) Request body payload.
* @param {function} callBack - (Optional) Call back function that takes 3 parameters (err, response, body), will return promise if this parameter was ignored.

## Examples
Get all pops creatives
```
rtxClient.request('GET', '/pops-api/v1/creatives', null, null).then(res => {
  console.log(JSON.stringify(res))
});
```
----------
Get paused pops creatives
```
rtxClient.request('GET', '/pops-api/v1/creatives', {status: 'paused'}, null).then(res => {
  console.log(JSON.stringify(res))
});
```
----------
Using callback instead of promises
```
rtxClient.request('GET', '/pops-api/v1/creatives', {status: 'paused'}, null, function(err, res, body){
  console.log(JSON.stringify(body));
});
```