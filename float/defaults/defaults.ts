import { BinaryView } from "../types";

export const INT_BIT_SIZE = 32;

export const UINT_BIT_SIZE = 32;

export const FLOAT_BIT_SIZE = 32;

export const MANTISSA_BIT_SIZE = 23; 

export const EXPONENT_BIT_SIZE = 8;

export const MIN_EXPONENT_VALUE = -126;

export const MAX_EXPONENT_VALUE = 127;

export const EXPONENT_OFFSET = 127;

export const NOSIGNAL_FLOAT_NAN_BEGIN: BinaryView = [
    0,
    1, 1, 1, 1, 1, 1, 1, 1,
];

export const SIGNAL_FLOAT_NAN_BEGIN: BinaryView = [
    1,
    1, 1, 1, 1, 1, 1, 1, 1,
];

export const FLOAT_NAN: BinaryView = [
    ...NOSIGNAL_FLOAT_NAN_BEGIN,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
];

export const FLOAT_PLUS_INF: BinaryView = [
    0,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
];

export const FLOAT_MINUS_INF: BinaryView = [
    1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
];
