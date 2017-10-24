# HackerEarth-node

[![NPM](https://nodei.co/npm/hackerearth-node.png)](https://nodei.co/npm/hackerearth-node/)  <a href="https://hackerearth.com" target="_blank"><img src="https://hackerearth.global.ssl.fastly.net/static/hackerearth/images/badge/HE_badge_on_light.png" alt="Dark badge"></a>

![awesome](https://img.shields.io/badge/awesome-yes-green.svg)[![Build Status](https://travis-ci.org/tarungarg546/HackerEarth-node.svg?branch=master)](https://travis-ci.org/tarungarg546/HackerEarth-node)
  

>Node JS library for using HackerEarth API

This library helps you to compile your code with [HackerEarth API v3](https://www.hackerearth.com/docs/api/developers/code/legacy/)

Using HackerEarth API you can compile and run your code using their [codeTable](https://code.hackerEarth.com)

<h2>PreRequisite</h2>
 - Make sure you are using latest version of nodeJS.
 - You have to obtain your client secret key from [HackerEarth Here](http://www.hackerearth.com/api/register/) and voila you are done!

<h2>Install</h2>

>npm install hackerearth-node

<h1>Set Up</h1>

``` js
var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth=new hackerEarth(
                                '**********',  //Your Client Secret Key here this is mandatory
                                ''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);
var config={};
config.time_limit=1;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='';  //your source code for which you want to use hackerEarth api
config.input="";  //input against which you have to test your source code
config.language="C/C++/Py/C#"; //optional choose any one of them or none

```
<h1>Compile Your code</h1>

  - Using Callbacks

      ``` javascript
      //compile your code 
      hackerEarth.compile(config,function(err,response){
            if(err) {
              //deal with error
            } else {
              //deal with response
            }
      });

      ```

  - Using Promises

      ``` javascript
      //compile your code 
      hackerEarth.compile(config)
                              .then(result => {
                                //Handle Result
                              })
                              .catch(err => {
                                //Handle Error
                              });

      ```


<h1>Run Your Code</h1>

  - Using Callbacks

      ``` javascript
      //compile your code 
      hackerEarth.run(config,function(err,response){
            if(err) {
              //deal with error
            } else {
              //deal with response
            }
      });

      ```
  - Using Promises

      ``` javascript
      //compile your code 
      hackerEarth.run(config)
                          .then(result => {
                            //Handle Result
                          })
                          .catch(err => {
                            //Handle Error
                          });

      ```

<h3>Wanna Debug ?</h3>

> Append `debug=HE` before your node server command (or whatever is calling HackerEarth-node module) and analyse the logs printed on commandline to debug.

<h1> Todos </h1>

- [x] Use ES6 in source and transpile to babel for older version and put it into distribution/
- [x] Promisify whole package
- [ ] Using travis build tools for testing

<h2> Contact me on</h2>
  [![Twitter][1.1]][1]
  [![Facebook][2.1]][2]
  [1.1]: http://i.imgur.com/tXSoThF.png 
  [2.1]: http://i.imgur.com/P3YfQoD.png
  [1]: http://www.twitter.com/Tarun_Garg2
  [2]: http://www.facebook.com/tarungarg546
