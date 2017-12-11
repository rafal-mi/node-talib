var talib = require("../build/Release/talib");
var fs = require("fs");
const logger = require('./logger');

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Load market data
var marketContents = fs.readFileSync('examples/the.json', 'utf8');
var marketData = JSON.parse(marketContents);

const MFI = (high, low, close, volume, startIdx, endIdx, optInTimePeriod) => {

    if(startIdx + 1 < optInTimePeriod) {
        return [];
    }

    let typicalPrice = [];
    let moneyFlow = [];
    let positiveMoneyFlow = [];
    let negativeMoneyFlow = [];
    let positiveSum = 0.0;
    let negativeSum = 0.0;
    let sumCount = 0;
    let moneyFlowIndex = [];
    
    for(let i = startIdx - optInTimePeriod + 1; i <= endIdx; i++) {
        typicalPrice[i] = (high[i] + low[i] + close[i]) / 3;
        moneyFlow[i] = typicalPrice[i] * volume[i];
        if(i === 0) {
            positiveMoneyFlow[i] = 0.0;
            negativeMoneyFlow[i] = 0.0
            continue;
        }
        if(typicalPrice[i] > typicalPrice[i - 1]) {
            positiveMoneyFlow[i] = positiveMoneyFlow[i - 1] + moneyFlow[i];
            negativeMoneyFlow[i] = 0.0;
        } else {
            positiveMoneyFlow[i] = 0.0;
            negativeMoneyFlow[i] = negativeMoneyFlow[i - 1] + moneyFlow[i];
        }
        positiveSum += positiveMoneyFlow[i];
        negativeSum += negativeMoneyFlow[i];
        if(i >= optInTimePeriod) {
            positiveSum -= positiveMoneyFlow[i - optInTimePeriod];
            negativeSum -= negativeMoneyFlow[i - optInTimePeriod];
        }
        if(i < startIdx) {
            continue;
        }
        let moneyRatio = positiveSum / negativeSum;
        moneyFlowIndex[i] = 100.0 - (100.0 / (1 + moneyRatio))
    }

    return moneyFlowIndex;
}

let startIdx = 3;
let endIdx = 64;
let optInTimePeriod = 4;

let moneyFlowIndex = MFI(
    marketData.high,
    marketData.low, 
    marketData.close, 
    marketData.volume, 
    startIdx, 
    endIdx, 
    optInTimePeriod
);

console.log('MFI analysis result:', JSON.stringify(moneyFlowIndex));
