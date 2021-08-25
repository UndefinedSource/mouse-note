exports.__esModule = true;
exports.COLOR = void 0;
exports.COLOR = {
    // Typescript enum hexMap
    hexAlphabets: ['A', 'B', 'C', 'D', 'E', 'F'],
    convertHexToRgb: function (value) {
        var redValue = parseInt(value.substr(1, 2), 16);
        var greenValue = parseInt(value.substr(3, 2), 16);
        var blueValue = parseInt(value.substr(5, 2), 16);
        return "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";
    },
    convertNumToHex: function (value) {
        var maxSingleNum = 9;
        var hexIndex = 10;
        var hex = value.toString();
        if (value > maxSingleNum) {
            hex = this.hexAlphabets[value - hexIndex];
        }
        return hex;
    },
    convertDecimalToHex: function (value) {
        var hexTotalCount = 16;
        var maxHexNum = 15;
        var priorDigit = 0;
        var currentDigit = 0;
        while (value > maxHexNum) {
            value -= hexTotalCount;
            priorDigit++;
        }
        var priorHexDigit = this.convertNumToHex(priorDigit);
        var currentHexDigit = this.convertNumToHex(currentDigit);
        return "" + priorHexDigit + currentHexDigit;
    },
    convertRgbToHex: function (value) {
        var hex = '#';
        // split by 3 digit numbers
        var rgbEachValues = value.match(/[0-9]+/g);
        if (rgbEachValues) {
            for (var _i = 0, rgbEachValues_1 = rgbEachValues; _i < rgbEachValues_1.length; _i++) {
                var rgbValue = rgbEachValues_1[_i];
                hex += this.convertDecimalToHex(Number(rgbValue));
            }
        }
        return hex;
    }
};
