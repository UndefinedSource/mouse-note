export const COLOR = {
    // Typescript enum hexMap
    hexAlphabets: ['A', 'B', 'C', 'D', 'E', 'F'] as string[],
    convertHexToRgb(value: string): string { 
        const redValue: number = parseInt(value.substr(1,2), 16);
        const greenValue: number = parseInt(value.substr(3,2), 16);
        const blueValue: number = parseInt(value.substr(5,2), 16);

        return `rgb(${redValue},${greenValue},${blueValue})`;
    },
    convertNumToHex(value: number): string {
        const maxSingleNum: number = 9;
        const hexIndex: number = 10;
        let hex: string = value.toString();

        if (value > maxSingleNum) {
            hex = this.hexAlphabets[value - hexIndex];
        }

        return hex;
    },
    convertDecimalToHex(value: number): string {
        const hexTotalCount: number = 16;
        const maxHexNum: number = 15;
        let priorDigit: number = 0;
        let currentDigit: number = 0;

        while (value > maxHexNum) {
            value -= hexTotalCount;
            priorDigit++;
        }

        const priorHexDigit: string = this.convertNumToHex(priorDigit);
        const currentHexDigit: string = this.convertNumToHex(value);

        return `${priorHexDigit}${currentHexDigit}`;
    },
    convertRgbToHex(value: string): string {
        let hex: string = '#';
        // split by 3 digit numbers
        const rgbEachValues: string[] | null = value.match(/[0-9]+/g);

        if (rgbEachValues) {
            for (let rgbValue of rgbEachValues) {
                hex += this.convertDecimalToHex(Number(rgbValue));
            }
        }
        
        return hex;
    },
};
