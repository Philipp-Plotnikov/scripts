import { BinaryView, Bit } from "../types";
import { validateIsFloat, validateIsInt, validateIsUInt } from "./validators";

export function convertToBinary(data: number, size: number): [BinaryView, BinaryView] {
    const fractionResult: BinaryView = [];
    let integer = Math.floor(data);
    let fraction = getFractionalPart(data);
    if (fraction != 0) {
        while (fraction != 0) {
            fraction *= 2;
            fractionResult.push(Math.floor(fraction) as Bit);
            fraction = getFractionalPart(fraction);
        }
    }
    const intResult: BinaryView = new Array(size - fractionResult.length).fill(0);
    let index = 0;
    while (integer > 0) {
        intResult[index++] = integer % 2 as Bit;
        integer = Math.floor(integer / 2);
    }
    return [intResult, fractionResult];
}

function getFractionalPart(data: number): number {
    return data % 1;
}

export function convertToUInt(data: number, size: number): BinaryView {
    validateIsUInt(data, size);
    return convertToBinary(data, size)[0].reverse();
}

export function convertToInt(data: number, size: number): BinaryView {
    validateIsInt(data, size);
    const newData = data + Math.pow(2, size - 1);
    return convertToBinary(newData, size)[0].reverse();
}

export function convertToFloat(data: number, mantSize: number, expSize: number): BinaryView {
    validateIsFloat(data, mantSize, expSize);
    const isMinus = data < 0 ? 1 : 0;
    const [intMant, fracMant] = convertToBinary(data, mantSize);
    let decimalExp = intMant.lastIndexOf(1);
    if (decimalExp === -1) {
        decimalExp = -(fracMant.indexOf(1) + 1);
    }
    const intExp = convertToInt(decimalExp, expSize);
    intMant.reverse();
    fracMant.reverse();
    intExp.reverse();
    const result: BinaryView = [isMinus, ...intExp, ...intMant, ...fracMant];
    return result;
}

