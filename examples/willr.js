var talib = require("../build/Release/talib");
var fs = require("fs");

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Load market data
var marketContents = fs.readFileSync('examples/marketdata.json','utf8');
var marketData = JSON.parse(marketContents);

/*
   public RetCode willR( int startIdx,
      int endIdx,
      double inHigh[],
      double inLow[],
      double inClose[],
      int optInTimePeriod,
      MInteger outBegIdx,
      MInteger outNBElement,
      double outReal[] )
*/

// execute SMA indicator function with time period 180

let endIdx = marketData.close.length - 1;
let startIdx = endIdx - 100; 

talib.execute({
    name: "WILLR",
    startIdx: startIdx,
    endIdx: endIdx,
    high: marketData.high,
    low: marketData.low,
    close: marketData.close,
    optInTimePeriod: startIdx
}, function (err, result) {

    if(err) {
        console.log(err);
    }

    // Show the result array
    console.log("WILLR Function Results:");
    console.log(result);

});
