import { decode, encode, huffman } from "./utils/utils";

const data = 'hello world world hi how are you doing today?';
const huffmanCodes = huffman(data);
console.log(huffmanCodes);
const encodedData = encode(data, huffmanCodes);
console.log(encodedData);
const decodedData = decode(encodedData, huffmanCodes);
console.log(decodedData);