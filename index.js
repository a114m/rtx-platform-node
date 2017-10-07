const crypto = require('crypto');
const req = require('request');
const reqPr = require('request-promise');


class RTXClient {
  /**
   * Initialize RTX Client
   * @param {string} baseUrl - <Required> base API URL, Ex. 'https://api.rtxplatform.com'.
   * @param {string} apiKey - <Required> RTX apiKey.
   * @param {string} secretKey - <Required> RTX secretKey.
   */
  constructor(baseUrl, apiKey, secretKey) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  /**
   * Make RTX API call, returns promise if no callBack function is passed.
   * @param {string} method - <Required> HTTP method Ex. <'GET' | 'POST' | 'PUT' | 'UPDATE'>.
   * @param {string} resourcePath - <Required> Ex. '/pops-api/v1/creatives'.
   * @param {object} queryParams - <Optional> Additional URL query parameters.
   * @param {object/string} body - <Optional> Request body payload.
   * @param {function} callBack - <Optional> Call back function, will return promise if no callBack is passed.
   */
  request(method, resourcePath, queryParams=null, body=null, callBack=null){
    resourcePath = (resourcePath[0] !== '/') ? '/' + resourcePath : resourcePath
    const uri = this.baseUrl + resourcePath;
    const timestamp = Math.floor((new Date).getTime()/1000); // current epoch timestamp in seconds
    if (body && typeof(body) === 'object')
      body = JSON.stringify(body);
    const signature = this.sign(method, resourcePath, timestamp, this.apiKey, this.secretKey, body);
    
    queryParams = Object.assign({
      timestamp,
      api_key: this.apiKey,
      signature
    }, queryParams)
    const options = {
      uri,
      method,
      qs: queryParams,
    }
    if (body)
      options['body'] = body;
    return callBack ? req(options, callBack) : reqPr(options);
  }

  sign(method, resourcePath, timestamp, apiKey, secretKey, body=null) {
    let plainText = `${method} ${resourcePath}?api_key=${apiKey}&timestamp=${timestamp}`
    if (body)
      plainText += "&" + body;

    const sign = crypto.createHmac('sha256', secretKey);
    sign.update(plainText);

    return sign.digest('hex');
  }

}

module.exports = RTXClient;
