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
    let typicalPrice = [];
    let moneyFlow = [];
    let positiveMoneyFlow = [];
    let negativeMoneyFlow = [];
    let positiveSum = 0.0;
    let negativeSum = 0.0;
    let sumCount = 0;
    let moneyFlowIndex = [];
    
    for(let i = startIdx - optInTimePeriod + 1; i <= endIdx; i++) {
        if(startIdx + 1 < optInTimePeriod) {
            return [];
        }

        typicalPrice[i] = high[i] + low[i] + close[i];
        moneyFlow[i] = typicalPrice * volume[i];
        if(i === 0) {
            continue;
        }
        if(typicalPrice[i] > typicalPrice[i - 1]) {
            if(i > 0) {
                positiveMoneyFlow[i] = positiveMoneyFlow[i - 1] + moneyFlow[i];
                negativeMoneyFlow[i] = 0.0;
            } else {
                positiveMoneyFlow[i] = moneyFlow[i];
                negativeMoneyFlow[i] = 0.0;
            }
        } else {
            if(i > 0) {
                positiveMoneyFlow[i] = 0.0;
                negativeMoneyFlow[i] = negativeMoneyFlow[i - 1] + moneyFlow[i];
            } else {
                positiveMoneyFlow[i] = 0.0;
                negativeMoneyFlow[i] = moneyFlow[i];
            }
        
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

let startIdx = 19;
let endIdx = 64;
let optInTimePeriod = 20;

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
