"use strict";

// add polyfills to simulate browser environment
global.XMLHttpRequest = global.XMLHttpRequest || require('xmlhttprequest').XMLHttpRequest;
global.Promise = global.Promise || require('native-promise-only');

var test = require('tape');
var jsonproxy = require('../');

var exampleURL = 'http://jsonview.com/example.json';
var exampleJSON = require('./example.json');

test('default host', function (t) {
  t.plan(1);
  jsonproxy(exampleURL)
    .then(function (json) {
      t.deepEqual(json, exampleJSON);
      t.end();
    });
});

test('custom host', function (t) {
  t.plan(1);
  jsonproxy('http://jsonp.nodejitsu.com', exampleURL)
    .then(function (json) {
      t.deepEqual(json, exampleJSON);
      t.end();
    });
});
