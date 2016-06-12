"use strict";

const HackerEarth = require('./hackerEarth-js');

const hackerEarth = new HackerEarth(
    '**********', //client secret key
    ''
);

const config = {};

config.time_limit = 1;

config.memory_limit = 323244;

config.source = 'Your Code'; 

config.input = "5";

hackerEarth.run(config, (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log(JSON.parse(res));
});
