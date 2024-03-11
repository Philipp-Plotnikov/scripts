import { EXPONENT_BIT_SIZE, INT_BIT_SIZE, MANTISSA_BIT_SIZE, UINT_BIT_SIZE } from "./defaults/defaults";
import { convertToBinary, convertToFloat, convertToInt, convertToUInt } from "./utils/utils";

const data = 2.5;
try {
    console.log("Original number: ", data);
    // console.log("------------");
    // console.log("UInt view: ", convertToUInt(data, UINT_BIT_SIZE));
    // console.log("------------");
    // console.log("Int view: ", convertToInt(data, INT_BIT_SIZE));
    // console.log("------------");
    console.log("Float view: ", convertToFloat(data, MANTISSA_BIT_SIZE, EXPONENT_BIT_SIZE));
} catch (error) {
    console.error(error);
}