import { CPU, DEFAULT_CPU_STATE_VALUE, DEFAULT_IP_VALUE, DEFAULT_ZF_VALUE, INSTRUCTION_CLASSIFICATIONS, MEMORY } from "../constants";
import { CPU_STATES, INSTRUCTIONS, InternalData, ZF_REGISTER_STATES } from "../types";
import { validateBinaryOperator, validateTernaryOperator, validateUnaryOperator } from "./validators";
import * as fs from 'fs'; 

function encodeData(data: string): InternalData {
    const tokenList = data.split(/\s+/);
    const binaryTokens: InternalData = [];
    for (let i = 0; i < tokenList.length; i++) {
        const token1 = tokenList[i];
        if (!(token1 in INSTRUCTIONS)) {
            throw new Error(`"${token1}" is not right instruction`);      
        }
        binaryTokens.push(INSTRUCTIONS[token1]);
        switch (true) {
            case INSTRUCTION_CLASSIFICATIONS.unaryOperators[token1]:
                {
                    const token2 = tokenList[++i];
                    validateUnaryOperator(token1, token2);
                    switch (true) {
                        case INSTRUCTIONS[token1] === INSTRUCTIONS.READ:
                            const encodedString = convertStringToNumberList(token2);
                            binaryTokens.push(encodedString.length, ...encodedString);
                            break;
                        default:
                            binaryTokens.push(+token2);;
                    }
                }
                break;
            case INSTRUCTION_CLASSIFICATIONS.binaryOperators[token1]:
                {
                    const token2 = tokenList[++i];
                    const token3 = tokenList[++i];
                    validateBinaryOperator(token1, token2, token3);
                    binaryTokens.push(+token2, +token3);
                }
                break;
            case INSTRUCTION_CLASSIFICATIONS.ternaryOperators[token1]:
                {
                    const token2 = tokenList[++i];
                    const token3 = tokenList[++i];
                    const token4 = tokenList[++i];
                    validateTernaryOperator(token1, token2, token3, token4);
                    binaryTokens.push(+token2, +token3, +token4);
                }
        }
    }
    return binaryTokens;
}

function convertStringToNumberList(data: string): number[] {
    const encodedString: number[] = [];
    for (let i = 0; i < data.length; i++) {
        encodedString.push(data.charCodeAt(i));
    }
    return encodedString;
}

function decodeData(data: number) {
    switch (data) {
        case INSTRUCTIONS.SET:
            set();
            break;
        case INSTRUCTIONS.ADD:
            add();
            break;
        case INSTRUCTIONS.SUB:
            sub();
            break;
        case INSTRUCTIONS.MUL:
            mul();
            break;
        case INSTRUCTIONS.DIV:
            div();
            break;
        case INSTRUCTIONS.CMP:
            cmp();
            break;
        case INSTRUCTIONS.JMP:
            jmp();
            break;
        case INSTRUCTIONS.JE:
            je();
            break;
        case INSTRUCTIONS.JNE:
            jne();
            break;
        case INSTRUCTIONS.JGE:
            jge();
            break;
        case INSTRUCTIONS.READ:
            read();
            break;
        case INSTRUCTIONS.OUT:
            out();
            break;
        case INSTRUCTIONS.EXIT:
            exit();
            break;
        default:
            throw new Error(`"${data}" is not recognized instruction`);
    }
}

function set() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const operand2 = retrieveFromMemmoryAndIncrementIPRegister();
    storeInMemmory([operand2], operand1);
}

function add() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const value1 = retrieveFromMemmory(operand1);
    const operand2 = retrieveFromMemmoryAndIncrementIPRegister();
    const value2 = retrieveFromMemmory(operand2);
    const operand3 = retrieveFromMemmoryAndIncrementIPRegister();
    const result = value1 + value2;
    storeInMemmory([result], operand3);
}

function sub() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const value1 = retrieveFromMemmory(operand1);
    const operand2 = retrieveFromMemmoryAndIncrementIPRegister();
    const value2 = retrieveFromMemmory(operand2);
    const operand3 = retrieveFromMemmoryAndIncrementIPRegister();
    const result = value1 - value2;
    storeInMemmory([result], operand3);
}

function mul() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const value1 = retrieveFromMemmory(operand1);
    const operand2 = retrieveFromMemmoryAndIncrementIPRegister();
    const value2 = retrieveFromMemmory(operand2);
    const operand3 = retrieveFromMemmoryAndIncrementIPRegister();
    const result = value1 * value2;
    storeInMemmory([result], operand3);
}

function div() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const value1 = retrieveFromMemmory(operand1);
    const operand2 = retrieveFromMemmoryAndIncrementIPRegister();
    const value2 = retrieveFromMemmory(operand2);
    const operand3 = retrieveFromMemmoryAndIncrementIPRegister();
    const result = value1 / value2;
    storeInMemmory([result], operand3);
}

function read() {
    const operand1Length = retrieveFromMemmoryAndIncrementIPRegister();
    const operand1: string[] = [];
    for (let i = 0; i < operand1Length; i++) {
        const symbol = String.fromCharCode(retrieveFromMemmoryAndIncrementIPRegister());
        operand1.push(symbol);
    }
    const path = operand1.join('');
    if (!fs.existsSync(path)) {
        throw new Error(`File is not exist`);
    }
    let data = fs.readFileSync(path).toString();
    setIPCPURegisterValue(DEFAULT_IP_VALUE);
    runCPUCycle(data); 
}

function out() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const result = retrieveFromMemmory(operand1);
    console.log(result);
}

function cmp() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    const value1 = retrieveFromMemmory(operand1);
    const operand2 = retrieveFromMemmoryAndIncrementIPRegister();
    const value2 = retrieveFromMemmory(operand2);
    switch (true) {
        case value1 === value2:
            setZFCPURegisterValue(ZF_REGISTER_STATES.EQUAL);
            break;
        case value1 > value2:
            setZFCPURegisterValue(ZF_REGISTER_STATES.GREATER);
            break;
        case value1 < value2:
            setZFCPURegisterValue(ZF_REGISTER_STATES.LESS);
            break;
        default:
            throw new Error(`can't compare "${operand1}" and "${operand2}"`);
    }
}

function je() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    if (CPU.ZF !== ZF_REGISTER_STATES.EQUAL) {
        return;
    }
    jmp(operand1);
}

function jne() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    if (CPU.ZF === ZF_REGISTER_STATES.EQUAL) {
        return;
    }
    jmp(operand1);
}

function jge() {
    const operand1 = retrieveFromMemmoryAndIncrementIPRegister();
    if (CPU.ZF !== ZF_REGISTER_STATES.GREATER) {
        return;
    }
    jmp(operand1);
}

function jmp(operand1?: number) {
    if (!operand1) {
        operand1 = retrieveFromMemmoryAndIncrementIPRegister()
    }
    setIPCPURegisterValue(operand1);
}

function exit() {
    setCPUStateValue(CPU_STATES.STOP_EXECUTION);
}

function storeInMemmory(data: InternalData, address = 0) {
    const storage = MEMORY.storage;
    for (let i = 0; i < data.length; i++) {
        const computedAddress = getComputedMemmoryAddress(i + address);
        storage[computedAddress] = data[i];
    }
}

function retrieveFromMemmory(address = CPU.IP): number {
    return MEMORY.storage[getComputedMemmoryAddress(address)];
}

function retrieveFromMemmoryAndIncrementIPRegister(): number {
    const data = retrieveFromMemmory();
    setIPCPURegisterValue(CPU.IP + 1);
    return data;
}

function setIPCPURegisterValue(value: number) {
    CPU.IP = getComputedMemmoryAddress(value);
}

function setZFCPURegisterValue(value: ZF_REGISTER_STATES) {
    CPU.ZF = value;
}

function setCPUStateValue(value: CPU_STATES) {
    CPU.STATE = value;
}

export function resetCPURegisters() {
    setIPCPURegisterValue(DEFAULT_IP_VALUE);
    setZFCPURegisterValue(DEFAULT_ZF_VALUE);
    setCPUStateValue(DEFAULT_CPU_STATE_VALUE);
}

function getComputedMemmoryAddress(address: number): number {
    return address % MEMORY.size;
}

export function runCPUCycle(data: string) {
    const internalData = encodeData(data);
    storeInMemmory(internalData);
    while (CPU.STATE === CPU_STATES.EXECUTION && CPU.IP < internalData.length) {
        const instruction = retrieveFromMemmoryAndIncrementIPRegister();
        decodeData(instruction);
    }
}