
const rp = require('request-promise');

const debug = require('debug')('HE');

class helpers {
    constructor() {

    }
    getQueryData({language,time_limit,memory_limit,source,input},clientSecret,mode) {
        const obj ={
            client_secret:clientSecret,
            async:mode,
            source:source,
            lang:this.getLanuage(),
            time_limit:time_limit||1,
            memory_limit:memory_limit||262144
        }
        return obj;
    }
    getLanuage() {
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
            body: data,
            json: true
        }
    }

    doOperation(rpData,callback) {
        rp(rpData)
            .then((body) => {
                return body.json();
            })
            .then((res) => {
                callback(null,res);
            })
            .catch((err) => {
                callback(err,null);
            });
    }

};

class HackerEarth extends helpers {
    constructor(clientSecret, mode) {
        super();
        debug('Bootstraping HackerEarth module with clientSecret as %s and mode as %s', clientSecret,mode);  
        this._runURL = 'https://api.hackerearth.com/v3/code/run/';
        this._compileURL = 'https://api.hackerearth.com/v3/code/compile/';
        this._clientSecret = clientSecret;
        this._mode = mode || 0;
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
        let data = super.getQueryData(config,this.clientSecret,this.compileURL,this.mode);
        let rpData=super.getRequestPostJSON(data,this.compileURL);
        debug("In HackerEarth:Compile Data sent to API is %s",JSON.stringify(data));    
    }

    run(config, callback) {
        let data = super.getQueryData(config,this.clientSecret,this.runURL,this.mode);
        let rpData=super.getRequestPostJSON(data,this.runURL);
        super.doOperation(rpData,callback);
        debug("In HackerEarth:Run Data sent to API is %s",JSON.stringify(data));
    }
};

module.exports = HackerEarth;
