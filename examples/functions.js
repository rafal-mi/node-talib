var talib = require("../build/Release/talib");
var functions = talib.functions;

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Display all indicator functions
for (var i in functions) {
    console.log(functions[i].name);
    if(functions[i].name === 'WILLR') {
        console.log(JSON.stringify(functions[i]));
    }
}

// Display total indicator function count
console.log();
console.log("Total Functions: " + functions.length);
