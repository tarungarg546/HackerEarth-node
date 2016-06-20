import test from 'ava';

var HE = require('./distribution/');

const hackerEarth = new HE(
    process.env.HE_KEY, //client secret key
    ''
);

const config = {
      time_limit:1,
      memory_limit:323244,
      source:'print "Hello World"',
      language:"Py"
  };

test('should be equal to run url',t => {
  t.is(hackerEarth.runURL,"https://api.hackerearth.com/v3/code/run/");
});

test('should be equal to compile url',t => {
  t.is(hackerEarth.compileURL,'https://api.hackerearth.com/v3/code/compile/');
});

test('should compile  with callback',t => {
  return hackerEarth.compile(config,(err,op) => {
    const res=JSON.parse(op);
    t.is(res.compile_status,'OK');
  });
});
test('should compile  with promise',t => {
  return hackerEarth.compile(config).then(op=> {
    op=JSON.parse(op);
    t.is(op.compile_status,'OK');
  });
});
test('should run  with promise',t => {
  return hackerEarth.run(config).then(op=> {
    op=JSON.parse(op);
    t.is(op.run_status.status,'AC');
  });
});

test('should run with callback',t => {
 return hackerEarth.run(config,(err,op) => {
    const res=JSON.parse(op);
    t.is(res.run_status.status,'AC');
  });
});