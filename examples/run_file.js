const hackerEarth = require('./hackerEarth-js');
const hackerEarth = new HackerEarth(
    '**********', //client secret key
    '', //mode sync or async(optional)
    '', //time_limit(optional)
    '' //memory_limit(optional)
);
const config = {};
config.time_limit = 1;
config.memory_limit = 323244;
config.input = "5";
hackerEarth.runWithFile(config, FilePath, (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log(JSON.parse(res));
});
