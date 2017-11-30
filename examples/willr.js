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


const dataLength = 7 * 8;
const count = 4;
const beginAt = 100;
let results = [];

for (let n = 0; n < count; n++) {

    const sliceArray = a => a.slice(beginAt - dataLength + n, beginAt + n);

    let high = sliceArray(marketData.high);
    let low = sliceArray(marketData.low);
    let close = sliceArray(marketData.close);

    let startIdx = dataLength - 1;
    
    talib.execute({
        name: "WILLR",
        startIdx: startIdx,
        endIdx: startIdx,
        high: high,
        low: low,
        close: close,
        optInTimePeriod: startIdx
    }, function (err, result) {

        if (err) {
            console.log(err);
        }

        results[n] = result;
        console.log(JSON.stringify(results));
        

    });

};

