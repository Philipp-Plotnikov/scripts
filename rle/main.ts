import { decode, encode } from "./utils/utils";

const data = "#".repeat(280);
console.log("Original data: ", data);
console.log("Original data length: ", data.length);
console.log("-----------");
const encodedData = encode(data);
console.log("Encoded data: ", encodedData);
console.log("Encoded data length: ", encodedData.length);
console.log("-----------");
const decodedData = decode(encodedData);
console.log("Decoded data: ", decodedData);
console.log("Decoded data length: ", decodedData.length);
