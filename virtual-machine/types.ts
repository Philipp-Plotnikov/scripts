export enum INSTRUCTIONS {
    SET = 1,
    ADD,
    SUB,
    MUL,
    DIV,
    CMP,
    JMP,
    JE,
    JNE,
    JGE,
    READ,
    OUT,
    EXIT,
}

export enum ZF_REGISTER_STATES {
    EQUAL,
    GREATER,
    LESS,
}

export enum CPU_STATES {
    EXECUTION,
    STOP_EXECUTION,
}

export interface IInstructionClassification {
    unaryOperators: IUnaryOperators;
    binaryOperators: IBinaryOperators;
    ternaryOperators: ITernaryOperators; 
}

interface IUnaryOperators {
    JMP: true;
    JE: true;
    JNE: true;
    JGE: true,
    OUT: true;
    READ: true;
}

interface IBinaryOperators {
    CMP: true;
    SET: true;
}

interface ITernaryOperators {
    ADD: true;
    SUB: true;
    MUL: true;
    DIV: true;
}

export interface IMemory {
    storage: number[];
    size: number;
}

export interface  ICPU {
    IP: number;
    ZF: ZF_REGISTER_STATES;
    STATE: CPU_STATES;
}

export type InternalData = INSTRUCTIONS[];