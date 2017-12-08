var talib = require("../build/Release/talib");
var fs = require("fs");
const logger = require('./logger');

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Load market data
var marketContents = fs.readFileSync('examples/the.json', 'utf8');
var marketData = JSON.parse(marketContents);

/*
    talib.execute({
      name: 'MFI',
      startIdx: Storeroom.twoWeeksStartIdx - countCandles,
      endIdx: Storeroom.twoWeeksStartIdx,
      high: marketData.high,
      low: marketData.low,
      close: marketData.close,
      volume: marketData.volume,
      optInTimePeriod: Storeroom.twoWeeksStartIdx - countCandles
    }, (error, result) => {
*/

let startIdx = 20;
let endIdx = 64;
// let endIdx = 672;
let optInTimePeriod = 20;

logger.debug('MFI analysis input parameters: {');
logger.debug(`    startIdx: ${startIdx}`);
logger.debug(`    endIdx: ${endIdx}`);
logger.debug(`    optInTimePeriod: ${optInTimePeriod}`);
logger.debug(`    high: [${marketData.high.slice(0, 8)}]`);
logger.debug(`    low: [${marketData.low.slice(0, 8)}]`);
logger.debug(`    close: [${marketData.close.slice(0, 8)}]`);
logger.debug(`    volume: [${marketData.volume.slice(0, 8)}]`);
logger.debug('}');

talib.execute({
    name: "MFI",
    startIdx: startIdx,
    endIdx: endIdx,
    high: marketData.high,
    low: marketData.low,
    close: marketData.close,
    volume: marketData.volume,
    optInTimePeriod: optInTimePeriod
}, function (err, result) {

    if (err) {
        console.log(err);
    }

    logger.debug('MFI analysis output parameters: {');
    logger.debug(`    begIndex: ${result.begIndex}`);
    logger.debug(`    nbElement: ${result.nbElement}`);
    logger.debug(`    outReal: [${result.result.outReal.slice(0, 8)}]`);
    logger.debug('}');

    console.log(JSON.stringify(result));
});
