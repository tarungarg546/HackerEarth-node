'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rp = require('request-promise');
var debug = require('debug')('HE');
require('babel-polyfill');

var helpers = function () {
    function helpers() {
        _classCallCheck(this, helpers);
    }

    _createClass(helpers, [{
        key: 'getQueryData',
        value: function getQueryData(_ref, clientSecret, mode) {
            var language = _ref.language;
            var time_limit = _ref.time_limit;
            var memory_limit = _ref.memory_limit;
            var source = _ref.source;
            var input = _ref.input;

            var obj = {
                client_secret: clientSecret,
                async: mode,
                source: source,
                lang: this.getLanuage(language),
                input: input,
                time_limit: time_limit || 1,
                memory_limit: memory_limit || 262144
            };
            return obj;
        }
    }, {
        key: 'getLanuage',
        value: function getLanuage(language) {
            var lang = void 0;
            if (language === 'C++') {
                lang = 'CPP';
            } else if (language === 'C') {
                lang = 'C';
            } else if (language === 'Py') {
                lang = 'PYTHON';
            } else if (language === 'C#') {
                lang = 'CSHARP';
            } else {
                lang = language.toUpperCase();
            }
            return lang;
        }
    }, {
        key: 'getRequestPostJSON',
        value: function getRequestPostJSON(data, url) {
            return {
                method: 'POST',
                uri: url,
                form: data,
                gzip: true
            };
        }
    }, {
        key: 'doOperation',
        value: function doOperation(rpData, callback) {
            return new Promise(function (resolve, reject) {
                rp(rpData).then(function (body) {
                    return body;
                }).then(function (res) {
                    if (callback) {
                        callback(null, res);
                    }
                    resolve(res);
                }).catch(function (err) {
                    if (callback) {
                        callback(err, null);
                    }
                    reject(err);
                });
            });
        }
    }]);

    return helpers;
}();

var HackerEarth = function (_helpers) {
    _inherits(HackerEarth, _helpers);

    function HackerEarth(clientSecret, mode) {
        _classCallCheck(this, HackerEarth);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HackerEarth).call(this));

        _this._runURL = 'https://api.hackerearth.com/v3/code/run/';
        _this._compileURL = 'https://api.hackerearth.com/v3/code/compile/';
        _this._clientSecret = clientSecret;
        _this._mode = mode || 0;
        debug('Bootstraping HackerEarth module with clientSecret as %s and mode as %s', clientSecret, mode);
        return _this;
    }

    _createClass(HackerEarth, [{
        key: 'compile',
        value: function compile(config, callback) {
            var data = _get(Object.getPrototypeOf(HackerEarth.prototype), 'getQueryData', this).call(this, config, this.clientSecret, this.mode);
            debug('In HackerEarth:Compile Data sent to API is %s', JSON.stringify(data));
            var rpData = _get(Object.getPrototypeOf(HackerEarth.prototype), 'getRequestPostJSON', this).call(this, data, this.compileURL);
            return _get(Object.getPrototypeOf(HackerEarth.prototype), 'doOperation', this).call(this, rpData, callback);
        }
    }, {
        key: 'run',
        value: function run(config, callback) {
            var data = _get(Object.getPrototypeOf(HackerEarth.prototype), 'getQueryData', this).call(this, config, this.clientSecret, this.mode);
            debug('In HackerEarth:Run Data sent to API is %s', JSON.stringify(data));
            var rpData = _get(Object.getPrototypeOf(HackerEarth.prototype), 'getRequestPostJSON', this).call(this, data, this.runURL);
            return _get(Object.getPrototypeOf(HackerEarth.prototype), 'doOperation', this).call(this, rpData, callback);
        }
    }, {
        key: 'runURL',
        get: function get() {
            return this._runURL;
        }
    }, {
        key: 'compileURL',
        get: function get() {
            return this._compileURL;
        }
    }, {
        key: 'clientSecret',
        get: function get() {
            return this._clientSecret;
        }
    }, {
        key: 'mode',
        get: function get() {
            return this._mode;
        }
    }]);

    return HackerEarth;
}(helpers);

module.exports = HackerEarth;