import { INSTRUCTIONS } from "../types";

export function validateUnaryOperator(instruction: string, operand1: string) {
    switch (true) {
        case INSTRUCTIONS[instruction] === INSTRUCTIONS.READ:
            if (isNotEmptyString(operand1)) {
                break;
            }
            throw new Error(`in instruction "${instruction}" "${operand1}" is not string`);
        case INSTRUCTIONS[instruction]:
            const convertedOperand1 = +operand1;
            if (isInteger(convertedOperand1)) {
                break;
            }
            throw new Error(`in instruction "${instruction}" "${operand1}" is not integer`);             
    }
}

export function validateBinaryOperator(instruction: string, operand1: string, operand2: string) {
    const convertedOperand1 = +operand1;
    const convertedOperand2 = +operand2;
    if (!(isInteger(convertedOperand1) && isInteger(convertedOperand2))) {
        throw new Error(`in instruction "${instruction}" "${operand1}" or "${operand2}" is not integer`); 
    }
}

export function validateTernaryOperator(instruction: string, operand1: string, operand2: string, operand3: string) {
    const convertedOperand1 = +operand1;
    const convertedOperand2 = +operand2;
    const convertedOperand3 = +operand3;
    if (!(isInteger(convertedOperand1) && isInteger(convertedOperand2) && isInteger(convertedOperand3))) {
        throw new Error(`in instruction "${instruction}" "${operand1}" or "${operand2}" or "${operand3}" is not integer`); 
    }
}

function isInteger(data: unknown): boolean {
    return Number.isInteger(data) && !Number.isNaN(data);
}

function isNotEmptyString(data: unknown): boolean {
    return typeof data === 'string' && !!data;
}
