import { decodeFloat } from "./utils/utils";

const data = 0.33333333333;
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
    // const binaryFloat = convertToFloat(data);
    const binaryFloat = "0x3eaaaaaa";
    console.log("Binary float view: ", binaryFloat);
    const float = decodeFloat(binaryFloat);
    console.log("------------");
    console.log("Float view: ", float);
} catch (error) {
    console.error(error);
}