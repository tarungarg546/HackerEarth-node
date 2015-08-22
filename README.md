# HackerEarth-node
nodeJS library for using HackerEarth API

This library helps you to compile your code with [HackerEarth API v3!] (https://www.hackerearth.com/docs/api/developers/code/legacy/)

Using HackerEarth API you can compile and run your code using their [codeTable!](https://code.hackerEarth.com)

#PreRequisite

You have to obtain your client secret key from [HackerEarth Here](http://www.hackerearth.com/api/register/) and voila you are done!

#Install

>npm install hackerearth-node

#Set Up

```
var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth=new hackerEarth(
                                '**********',  //Your Client Secret Key here this is mandatory
                                '',  //mode sync or async(optional) async is by default and preferred for nodeJS
                                '',  //time_limit (optional)
                                '',  //memory_limit(optional)
);
var config={};
config.time_limit=1;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='';  //your source code for which you want to use hackerEarth api
config.input="";  //input against which you have to test your source code
config.language="C/C++/Py/C#"; //optional choose any one of them or none

//Compile your Source Code

hackerEarth.compile(config,function(err,response){
      if(err)
        res.send(err);
      else
        //deal with response
        console.log(JSON.parse(res).compile_status);  //you can use it in your own way
});
var FilePath="";//path from where you have to take source code
//compile a file input
hackerEarth.compileWithFile(config,FilePath,function(err,response){
      if(err)
        res.send(err);
      else
        //deal with response
        console.log(JSON.parse(res).compile_status);  //you can use it in your own way
});

//Run a source code against a input

hackerEarth.run(config,function(err,response){
      if(err)
        res.send(err);
      else
        //deal with response
        console.log(JSON.parse(res).run_status);  //you can use it in your own way
});

//run a source code against a file input

hackerEarth.runWithFile(config,FilePath,function(err,response){
      if(err)
        res.send(err);
      else
        //deal with response
        console.log(JSON.parse(res).compile_status);  //you can use it in your own way
});
```
