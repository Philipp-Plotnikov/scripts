import { CPU_STATES, ICPU, IInstructionClassification, IMemory as IMemory } from "./types";

export const INSTRUCTION_CLASSIFICATIONS: IInstructionClassification = {
    unaryOperators: {
        JMP: true,
        JE: true,
        JNE: true,
        JGE: true,
        OUT: true,
        READ: true,
    },
    binaryOperators: {
        CMP: true,
        SET: true,
    },
    ternaryOperators: {
        ADD: true,
        SUB: true,
        MUL: true,
        DIV: true,
    },
};

export const DEFAULT_IP_VALUE = 0;
export const DEFAULT_ZF_VALUE = 0;
export const DEFAULT_CPU_STATE_VALUE = CPU_STATES.EXECUTION;
export const CPU: ICPU = {
    IP: DEFAULT_IP_VALUE,
    ZF: DEFAULT_ZF_VALUE,
    STATE: DEFAULT_CPU_STATE_VALUE,
};

const MEMORY_SIZE = 1000;
export const MEMORY: IMemory = {
    storage: new Array(MEMORY_SIZE),
    size: MEMORY_SIZE,
};