var talib = require("../build/Release/talib");
var fs = require("fs");

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Load market data
var marketContents = fs.readFileSync('examples/marketdata.json','utf8');
var marketData = JSON.parse(marketContents);

// execute SMA indicator function with time period 180
talib.execute({
    name: "BBANDS",
    startIdx: 0,
    endIdx: marketData.close.length - 1,
    inReal: marketData.close,
    optInTimePeriod: 20,
    optInNbDevUp: 2.0,
    optInNbDevDn: 2.0,
    optInMAType: 0

}, function (err, result) {

    if(err) {
        console.log(err);
    }

    // Show the result array
    console.log("BBANDS Function Results:");
    console.log(result);

});
