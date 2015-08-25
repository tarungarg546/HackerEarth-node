var request=require('request');
var path=require('path');
var fs=require('fs');
var hackerEarth=function(client_secret,mode,time_limit,memory_limit){
	this.run_url="http://api.hackerearth.com/code/run/";//url for run
	this.compile_url="http://api.hackerearth.com/code/compile/";//url for compile
	this.client_secret=client_secret;//client will send it during new module intialization
	this.async=mode||0;//generally this is 0 for nodeJS since node is async in nature
	this.lang="";
	this.input="";
	this.source="";
	this.time_limit="";
	this.memory_limit="";
};
hackerEarth.prototype.compile=function(config,callback){
	this.lang=helpers.getLanguage(config.language);
	this.time_limit=config.time_limit||1;
	this.memory_limit=config.memory_limit||262144;
	this.source=config.source||" ";
	this.input=config.input||" ";
	var data=helpers.getQueryString(this);
	request.post({url:this.compile_url,form:data},function(err,httpResponse,responseBody){
		if(err)
			callback(err , null);
		else
			{
				if(httpResponse.statusCode==200)
					callback(null , responseBody);
				else
					callback(httpResponse.statusMessage , null);
			}
	});
};
hackerEarth.prototype.run=function(config,callback){
	this.lang=helpers.getLanguage(config.language);
	this.time_limit=config.time_limit||1;
	this.memory_limit=config.memory_limit||262144;
	this.source=config.source||" ";
	this.input=config.input||" ";
	var data=helpers.getQueryString(this);
	request.post({url:this.run_url,form:data},function(err,httpResponse,responseBody){

		if(err)
			callback(err , null);
		else
			{
				if(httpResponse.statusCode==200)
					callback(null , responseBody);
				else
					callback(httpResponse.statusMessage , null);
			}
	});
};
hackerEarth.prototype.compileWithFile=function(config,filePath,callback){
	this.time_limit=config.time_limit||1;
	this.memory_limit=config.memory_limit||262144;
	var ext = path.extname(filePath||'').split('.');
    var extension=ext[ext.length - 1];
	this.lang=config.language?helpers.getLanguage(config.language):helpers.getLanguage(extension);
	this.source=fs.readFileSync(filePath,'utf8');
	//console.log(this.source);
	this.input=config.input||" ";
	var data=helpers.getQueryString(this);
	request.post({url:this.compile_url,form:data},function(err,httpResponse,responseBody){
		if(err)
		{
			//console.log(err);
			callback(err , null);
		}	
		else
			{
				if(httpResponse.statusCode==200)
				{
					//console.log(responseBody);
					callback(null , responseBody);
				}	
				else
					callback(httpResponse.statusMessage , null);
			}
	});
};
hackerEarth.prototype.runWithFile=function(config,filePath,callback){
	this.time_limit=config.time_limit||1;
	this.memory_limit=config.memory_limit||262144;
	var ext = path.extname(filename||'').split('.');
    var extension=ext[ext.length - 1];
	this.lang=helpers.getLanguage(config.language)|| helpers.getLanguage(extension);
	this.source=fs.readFileSync(filePath,'utf8');
	var data=helpers.getQueryString(this);
	this.input=config.input||" ";
	request.post({url:this.run_url,form:data},function(err,httpResponse,responseBody){
		if(err)
			callback(err , null);
		else
			{
				if(httpResponse.statusCode==200)
					callback(null , responseBody);
				else
					callback(httpResponse.statusMessage , null);
			}
	});
};
var helpers={
	getQueryString:function(config){
		//console.log(config);
		var temp={
			'client_secret': config.client_secret ,
    		'async': config.async ,
    		'source': config.source ,
    		'lang': config.lang ,
    		'time_limit': config.time_limit ,
			'memory_limit': config.memory_limit
		};
		return temp;
	},
	getLanguage:function(language){
		var lang;
		if(language=="C++"){
			lang='CPP';
		}
		else if(language=="C"){
			lang="C";
		}
		else if(language=="Py"){
			lang="PYTHON";
		}
		else if(language=="C#"){
			lang="CSHARP";
		}
		else{
			lang=language.toUpperCase();
		}
		return lang;
	}
}
module.exports=hackerEarth;//expose this file