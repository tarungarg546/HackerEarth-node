'use strict';
const rp = require('request-promise');
const debug = require('debug')('HE');
require('babel-polyfill');
class helpers {
    constructor() {

    }
    getQueryData({language,time_limit,memory_limit,source,input},clientSecret,mode) {
        const obj ={
            client_secret:clientSecret,
            async:mode,
            source:source,
            lang:this.getLanuage(language),
            input:input,
            time_limit:time_limit||1,
            memory_limit:memory_limit||262144
        };
        return obj;
    }
    getLanuage(language) {
        let lang;
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

    getRequestPostJSON(data,url) {
        return {
            method: 'POST',
            uri: url,
            form: data,
            gzip: true
        };
    }

    doOperation(rpData,callback) {
        return new Promise((resolve, reject) => {
             rp(rpData)
                    .then((body) => {
                        return body;
                    })
                    .then((res) => {
                        if(callback) {
                            callback(null,res);
                        }
                        resolve(res);
                    })
                    .catch((err) => {
                        if(callback) {
                            callback(err,null);
                        }
                        reject(err);
                    });
        });
    }

}

class HackerEarth extends helpers {
    constructor(clientSecret, mode) {
        super();  
        this._runURL = 'https://api.hackerearth.com/v3/code/run/';
        this._compileURL = 'https://api.hackerearth.com/v3/code/compile/';
        this._clientSecret = clientSecret;
        this._mode = mode || 0;
        debug('Bootstraping HackerEarth module with clientSecret as %s and mode as %s', clientSecret,mode);
    }

    get runURL() {
        return this._runURL;
    }

    get compileURL() {
        return this._compileURL;    
    }

    get clientSecret() {
        return this._clientSecret;
    }

    get mode() {
        return this._mode;
    }
    compile(config, callback) {
        let data = super.getQueryData(config,this.clientSecret,this.mode);
        debug('In HackerEarth:Compile Data sent to API is %s',JSON.stringify(data));
        let rpData = super.getRequestPostJSON(data,this.compileURL);
        return super.doOperation(rpData,callback);    
    }

    run(config, callback) {
        let data = super.getQueryData(config,this.clientSecret,this.mode);
        debug('In HackerEarth:Run Data sent to API is %s',JSON.stringify(data));
        let rpData=super.getRequestPostJSON(data,this.runURL);
        return super.doOperation(rpData,callback);
    }
}

module.exports = HackerEarth;
