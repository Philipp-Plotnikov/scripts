import { EXPONENT_BIT_SIZE, EXPONENT_OFFSET, FLOAT_BIT_SIZE, FLOAT_MINUS_INF, FLOAT_NAN, FLOAT_PLUS_INF, MANTISSA_BIT_SIZE, NOSIGNAL_FLOAT_NAN_BEGIN, SIGNAL_FLOAT_NAN_BEGIN } from "../defaults/defaults";
import { BinaryView, Bit } from "../types";
import { getFloatRnage, validateIsInt, validateIsUInt } from "./validators";

export function convertToBinary(data: number, size: number): [BinaryView, BinaryView] {
    data = Math.abs(data);
    let integer = Math.floor(data);
    let fraction = getFractionalPart(data);
    const intResult: BinaryView = [];
    let index = 0;
    while (integer > 0 && index < size) {
        intResult[index++] = integer % 2 as Bit;
        integer = Math.floor(integer / 2);
    }
    size = size - index;
    index = 0;
    const fractionResult: BinaryView = new Array(size).fill(0);
    if (fraction != 0) {
        while (fraction != 0 && index < size) {
            fraction *= 2;
            fractionResult[index++] = Math.floor(fraction) as Bit;
            fraction = getFractionalPart(fraction);
        }
    }
    return [intResult, fractionResult];
}

function getFractionalPart(data: number): number {
    return data % 1;
}

export function convertToUInt(data: number, size: number): BinaryView {
    validateIsUInt(data, size);
    const [intResult, fractionResult] = convertToBinary(data, size);
    return [...fractionResult, ...intResult.reverse()];
}

export function convertToInt(data: number, size: number): BinaryView {
    validateIsInt(data, size);
    const newData = data + Math.pow(2, size - 1);
    const [intResult, fractionResult] = convertToBinary(newData, size);
    return [...intResult.reverse(), ...fractionResult.reverse()];
}

export function convertToFloat(data: number | string): string {
    data = Number(data);
    if (Number.isNaN(data)) {
        return convertBinToHex(FLOAT_NAN);
    }
    const [min, max] = getFloatRnage();
    if (data < min) {
        return convertBinToHex(FLOAT_MINUS_INF);
    }
    if (data > max) {
        return convertBinToHex(FLOAT_PLUS_INF);
    }
    const isMinus = data < 0 ? 1 : 0;
    const [intMant, fracMant] = convertToBinary(data, MANTISSA_BIT_SIZE + 1);
    let decimalExp = intMant.lastIndexOf(1);
    if (decimalExp === -1) {
        decimalExp = -(fracMant.indexOf(1) + 1);
        fracMant.splice(0, Math.abs(decimalExp + 1));
        fracMant.push(...new Array(Math.abs(decimalExp + 1)).fill(0));
    }
    const intExp = convertToUInt(decimalExp + EXPONENT_OFFSET, EXPONENT_BIT_SIZE);
    const mantissa = [...intMant.reverse(), ...fracMant];
    mantissa.splice(0, 1);
    const result: BinaryView = [isMinus, ...intExp, ...mantissa];
    return convertBinToHex(result);
}

export function decodeFloat(data: BinaryView | string): number {
    let binary = data as BinaryView;
    if (typeof data === 'string' && data.slice(0, 2).toLowerCase() === '0x') {
        binary = convertHexToFloatBin(data);
    }
    if (compareBinaryViews(binary, FLOAT_MINUS_INF)) {
        return -Infinity;
    }
    if (compareBinaryViews(binary, FLOAT_PLUS_INF)) {
        return +Infinity;
    }
    if (isFloatNaNBinaryView(binary)) {
        return NaN;
    }
    const sign = binary[0] === 0 ? 1 : -1;
    const exp = binary.slice(1, 1 + EXPONENT_BIT_SIZE);
    const mantissa: BinaryView = [1, ...binary.slice(1 + EXPONENT_BIT_SIZE)];
    const decimalExp = convertToDecimal(exp) - EXPONENT_OFFSET;
    const decimalMantissa = convertToDecimal(mantissa, 1);
    return sign * decimalMantissa * Math.pow(2, decimalExp);
}

function compareBinaryViews(binary1: BinaryView, binary2: BinaryView): boolean {
    if (binary1.length !== binary2.length) {
        return false;
    }
    for (let i = 0; i < binary1.length; i++) {
        if (binary1[i] !== binary2[i]) {
            return false;
        }
    }
    return true;
}

function isFloatNaNBinaryView(binary: BinaryView): boolean {
    const binaryBegin = binary.slice(0, NOSIGNAL_FLOAT_NAN_BEGIN.length);
    let isNaN = false;
    if (!(compareBinaryViews(binaryBegin, NOSIGNAL_FLOAT_NAN_BEGIN) || compareBinaryViews(binaryBegin, SIGNAL_FLOAT_NAN_BEGIN))) {
        return isNaN;
    }
    const binaryEnd = binary.slice(NOSIGNAL_FLOAT_NAN_BEGIN.length);
    for (let i = 0; i < binaryEnd.length; i++) {
        if (binaryEnd[i] === 1) {
            isNaN = true;
            break;
        }
    }
    return isNaN;
}

function convertToDecimal(binary: BinaryView, fractionStartIndex = -1): number {
    let result = 0;
    let fractionPow = -1;
    let intPow = fractionStartIndex === -1 ? binary.length - 1 : fractionStartIndex - 1;
    for (let i = 0; i < binary.length; i++) {
        if (i >= fractionStartIndex && fractionStartIndex !== -1) {
            result += binary[i] * Math.pow(2, fractionPow--);
            continue;
        }
        result += binary[i] * Math.pow(2, intPow--);
    }
    return result;
}

function convertHexToFloatBin(hex: string): BinaryView {
    hex = hex.replace("0x", "").toLowerCase();
    let tempResult = "";
    for(let c of hex) {
        switch(c) {
            case '0': tempResult += "0000"; break;
            case '1': tempResult += "0001"; break;
            case '2': tempResult += "0010"; break;
            case '3': tempResult += "0011"; break;
            case '4': tempResult += "0100"; break;
            case '5': tempResult += "0101"; break;
            case '6': tempResult += "0110"; break;
            case '7': tempResult += "0111"; break;
            case '8': tempResult += "1000"; break;
            case '9': tempResult += "1001"; break;
            case 'a': tempResult += "1010"; break;
            case 'b': tempResult += "1011"; break;
            case 'c': tempResult += "1100"; break;
            case 'd': tempResult += "1101"; break;
            case 'e': tempResult += "1110"; break;
            case 'f': tempResult += "1111"; break;
            default: throw new Error(`In "${hex}" the character "${c}" is not valid`);
        }
    }
    let result = tempResult.split('').map(item => +item) as BinaryView;
    const size = result.length;
    if (size > FLOAT_BIT_SIZE) {
        result = result.slice(0, size - FLOAT_BIT_SIZE);
    }
    if (size < FLOAT_BIT_SIZE) {
        result = [...Array(FLOAT_BIT_SIZE - size).fill(0), ...result]
    }
    return result;
}

function convertBinToHex(binary: BinaryView): string {
    const hexLength = binary.length / 4;
    let result = "";
    for (let i = 0; i < hexLength; i++) {
        const binaryChunk = binary.slice(i * 4, (i + 1) * 4);
        const chunk = binaryChunk.join('');
        switch(chunk) {
            case '0000': result += "0"; break;
            case '0001': result += "1"; break;
            case '0010': result += "2"; break;
            case '0011': result += "3"; break;
            case '0100': result += "4"; break;
            case '0101': result += "5"; break;
            case '0110': result += "6"; break;
            case '0111': result += "7"; break;
            case '1000': result += "8"; break;
            case '1001': result += "9"; break;
            case '1010': result += "a"; break;
            case '1011': result += "b"; break;
            case '1100': result += "c"; break;
            case '1101': result += "d"; break;
            case '1110': result += "e"; break;
            case '1111': result += "f"; break;
            default: throw new Error(`In "${binary}" the character "${chunk}" is not valid`);
        }
    }
    return `0x${result}`;
}