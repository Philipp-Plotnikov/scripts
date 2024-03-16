import { MANTISSA_BIT_SIZE, MAX_EXPONENT_VALUE } from "../defaults/defaults";

export function validateIsUInt(data: unknown, size: number) {
    if (!(Number.isInteger(data) && !Number.isNaN(data))) {
        throw new Error(`value "${data}" is not uinteger`);
    }
    const typedData = Number(data);
    validateUIntRange(typedData, size);
}

export function validateIsInt(data: unknown, size: number) {
    if (!(Number.isInteger(data) && !Number.isNaN(data))) {
        throw new Error(`value "${data}" is not integer`);
    }
    const typedData = Number(data);
    validateIntRange(typedData, size);
}

function validateUIntRange(data: number, size: number) {
    const max = getUIntRange(size);
    if (data < 0 || data > max) {
        throw new Error(`value "${data}" is out of the range of unit 0 - ${max}`);
    }
}

function getUIntRange(size: number): number {
    const max = Math.pow(2, size) - 1;
    console.log(`Range of uint is 0 - ${max}`);
    return max;
}

function validateIntRange(data: number, size: number) {
    const [min, max] = getIntRange(size);
    if (data < min || data > max) {
        throw new Error(`value "${data}" is out of the range of int ${min} - ${max}`);
    }
}

function getIntRange(size: number): [number, number] {
    const middle = Math.pow(2, size) / 2;
    const min = -middle;
    const max = middle - 1
    console.log(`Range of int is ${min} - ${max}`);
    return [min, max];
}

export function getFloatRnage(): [number, number] {
    const max = (2 - Math.pow(2, -MANTISSA_BIT_SIZE)) * Math.pow(2, MAX_EXPONENT_VALUE);
    const min = -max;
    console.log(`Range of float is ${min} - ${max}`);
    return [min, max];
}