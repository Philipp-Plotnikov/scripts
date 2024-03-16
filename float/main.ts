import { INT_BIT_SIZE, UINT_BIT_SIZE } from "./defaults/defaults";
import { convertToBinary, convertToFloat, convertToInt, convertToUInt, decodeFloat } from "./utils/utils";

const data = 2.5;
try {
    console.log("Original number: ", data);
    console.log("------------");
    // const uint = convertToUInt(data, UINT_BIT_SIZE);
    // console.log("UInt view: ", uint);
    // console.log("Length: ", uint.length);
    // console.log("------------");
    // const int = convertToInt(data, INT_BIT_SIZE);
    // console.log("Int view: ", int);
    // console.log("Length: ", int.length);
    // console.log("------------");
    const binaryFloat = convertToFloat(data);
    console.log("Binary float view: ", binaryFloat);
    const float = decodeFloat(binaryFloat);
    console.log("------------");
    console.log("Float view: ", float);
} catch (error) {
    console.error(error);
}