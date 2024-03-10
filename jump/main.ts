import { Modes } from "./types";
import { decode, encode } from "./utils/utils";
import * as fs from "fs";

// yarn start encode ./test-cases/decoded-data ./test-cases/encoded-data
// yarn start decode ./test-cases/encoded-data ./test-cases/test-decoded-data
try {
    const [mode, inputFilename, outputFilename] = process.argv.slice(2);
    if (!fs.existsSync(inputFilename)) {
        throw new Error(`File "${inputFilename}" is not exist`);
    }
    const data = fs.readFileSync(inputFilename).toString();
    switch (mode) {
        case Modes.ENCODE:
            const encodedData = encode(data);
            fs.writeFileSync(outputFilename, encodedData);
            break;
        case Modes.DECODE:
            const decodedData = decode(data);
            fs.writeFileSync(outputFilename, decodedData);
            break;
        default:
            throw new Error(`Mode paramater value should be "${Modes.ENCODE}" or "${Modes.DECODE}"`)
    }
} catch (error) {
    console.error(error);
}

// const data = "abcddddcd";
// console.log("Original data: ", data);
// console.log("Original data length: ", data.length);
// console.log("-----------");
// const encodedData = encode(data);
// console.log("Encoded data: ", encodedData);
// console.log("Encoded data length: ", encodedData.length);
// console.log("-----------");
// const decodedData = decode(encodedData);
// console.log("Decoded data: ", decodedData);
// console.log("Decoded data length: ", decodedData.length);