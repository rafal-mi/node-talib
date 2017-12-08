var talib = require("../build/Release/talib");
var fs = require("fs");

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Load market data
var marketContents = fs.readFileSync('examples/marketdata.json', 'utf8');
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

talib.execute({
    name: "WILLR",
    startIdx: 19,
    endIdx: marketData.high.length - 1,
    high: marketData.high,
    low: marketData.low,
    close: marketData.close,
    optInTimePeriod: 20
}, function (err, result) {

    if (err) {
        console.log(err);
    }

    console.log(JSON.stringify(result));
});
