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

export function validateIsFloat(data: unknown, mantSize: number, expSize: number) {
    if (!(typeof data == 'number' && !Number.isNaN(data))) {
        throw new Error(`value "${data}" is not float`);
    }
    const typedData = Number(data);
    validateFloatRange(typedData, mantSize, expSize);
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

function validateFloatRange(data: number, mantSize: number, expSize: number) {
    const [min, max] = getFloatRnage(mantSize, expSize);
    if (data < min || data > max) {
        throw new Error(`value "${data}" is out of the range of int ${min} - ${max}`);
    }
}

function getFloatRnage(mantSize: number, expSize: number): [number, number] {
    const maxMant = getUIntRange(mantSize);
    const [_, maxExp] = getIntRange(expSize);
    const min = -maxMant * Math.pow(2, maxExp);
    const max = maxMant * Math.pow(2, maxExp);
    console.log(`Range of float is ${min} - ${max}`);
    return [min, max];
}