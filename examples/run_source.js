var hackerEarth=require('./hackerEarth-js');
var hackerEarth=new hackerEarth(
	'**********',//client secret key
	'',//mode sync or async(optional)
	'',//time_limit(optional)
	''//memory_limit(optional)
	);
var config={};
config.time_limit=1;
config.memory_limit=323244;
config.source='Your Code';//Remember it should be properly formatted
config.input="5";
//console.dir(config);
hackerEarth.run(config,function(err,res){
	if(err)
		console.log(err);
	console.log(JSON.parse(res));
});

//hackerEarth.compile()