"use strict";

// add polyfills for non-browser usage
global.XMLHttpRequest = global.XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest;
global.Promise = global.Promise || require('native-promise-only');

var denodeify = require('denodeify');
var xhr = require('xhr');
var xhrPromise = denodeify(xhr);

module.exports = jsonproxy;

function jsonproxy (host, url) {
  if (!url) {
    url = host;
    host = null;
  }
  host = host || 'https://jsonp.nodejitsu.com/';

  var xhrOptions = {
    uri: host + '?url=' + encodeURIComponent(url),
    json: true
  };

  return xhrPromise(xhrOptions)
    .then(function (response) {
      var body = response.body;
      if (!/^2/.test(response.statusCode)) {
        throw body.error;
      }
      else {
        return body;
      }
    })
  ;
}
