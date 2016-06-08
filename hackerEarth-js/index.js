"use strict";

const request = require('request');

const path = require('path');

const fs = require('fs');

const HackerEarth = (clientSecret, mode) => {
    this.run_url = "http://api.HackerEarth.com/code/run/"; //url for run
    this.compile_url = "http://api.HackerEarth.com/code/compile/"; //url for compile
    this.client_secret = clientSecret; //client will send it during new module intialization
    this.async = mode || 0; //generally this is 0 for nodeJS since node is async in nature
};

HackerEarth.prototype.compile = (config, callback) => {
    this.lang = helpers.getLanguage(config.language);
    this.time_limit = config.time_limit || 1;
    this.memory_limit = config.memory_limit || 262144;
    this.source = config.source || " ";
    this.input = config.input || " ";
    const data = helpers.getQueryString(this);
    request.post({url: this.compile_url, form: data}, (err, httpResponse, responseBody) => {
        if (err) {
            callback(err, null);
        } else {
            if (httpResponse.statusCode == 200) {
                callback(null, responseBody);
            } else {
                callback(httpResponse.statusMessage, null);
            }
        }
    });
};

HackerEarth.prototype.run = (config, callback) => {
    this.lang = helpers.getLanguage(config.language);
    this.time_limit = config.time_limit || 1;
    this.memory_limit = config.memory_limit || 262144;
    this.source = config.source || " ";
    this.input = config.input || " ";
    const data = helpers.getQueryString(this);
    request.post({url: this.run_url, form: data}, (err, httpResponse, responseBody) => {
        if (err) {
            callback(err, null);
        } else {
            if (httpResponse.statusCode == 200) {
                callback(null, responseBody);
            } else {
                callback(httpResponse.statusMessage, null);
            }
        }
    });
};

HackerEarth.prototype.compileWithFile = (config, filePath, callback) => {
    this.time_limit = config.time_limit || 1;
    this.memory_limit = config.memory_limit || 262144;
    const ext = path.extname(filePath || '').split('.');
    const extension = ext[ext.length - 1];
    this.lang = config.language ? helpers.getLanguage(config.language) : helpers.getLanguage(extension);
    this.source = fs.readFileSync(filePath, 'utf8');
    this.input = config.input || " ";
    const data = helpers.getQueryString(this);
    request.post({url: this.compile_url, form: data}, (err, httpResponse, responseBody) => {
        if (err) {
            callback(err, null);
        } else {
            if (httpResponse.statusCode == 200) {
                callback(null, responseBody);
            } else {
                callback(httpResponse.statusMessage, null);
            }
        }
    });
};

HackerEarth.prototype.runWithFile = (config, filePath, callback) => {
    this.time_limit = config.time_limit || 1;
    this.memory_limit = config.memory_limit || 262144;
    const ext = path.extname(filename || '').split('.');
    const extension = ext[ext.length - 1];
    this.lang = helpers.getLanguage(config.language) || helpers.getLanguage(extension);
    this.source = fs.readFileSync(filePath, 'utf8');
    const data = helpers.getQueryString(this);
    this.input = config.input || " ";
    request.post({url: this.run_url, form: data}, (err, httpResponse, responseBody) => {
        if (err) {
            callback(err, null);
        } else {
            if (httpResponse.statusCode == 200) {
                callback(null, responseBody);
            } else {
                callback(httpResponse.statusMessage, null);
            }
        }
    });
};
const helpers = {

    getQueryString: (config) => {

        const temp = {
            'client_secret': config.client_secret,
            'async': config.async,
            'source': config.source,
            'lang': config.lang,
            'time_limit': config.time_limit,
            'memory_limit': config.memory_limit
        };

        return temp;
    },
    getLanguage: (language) => {
        let lang;

        if (language == "C++") {
            lang = 'CPP';
        } else if (language == "C") {
            lang = "C";
        } else if (language == "Py") {
            lang = "PYTHON";
        } else if (language == "C#") {
            lang = "CSHARP";
        } else {
            lang = language.toUpperCase();
        }
        return lang;
    }
}
module.exports = HackerEarth;
