const CHAR_CHUNK_SIZE = 258;
const ESCAPE_CHUNK_SIZE = 256;

export function encode(data: string): string {
    let encodedData = "";
    for (let i = 0; i < data.length; i++) {
        const character = data[i];
        const isEscapeCharacter = character === '#';
        const characterAmount = countCharacter(character, i, data);
        i += characterAmount - 1;
        const CHUNK_SIZE = isEscapeCharacter ? ESCAPE_CHUNK_SIZE : CHAR_CHUNK_SIZE;
        const chunkAmount = Math.ceil(characterAmount / CHUNK_SIZE);
        for (let i = 0; i < chunkAmount; i++) {
            const currentChunkSize = (i + 1 == chunkAmount) ? characterAmount - i * CHUNK_SIZE : CHUNK_SIZE;
            encodedData += isEscapeCharacter
               ? encodeEscapeCharacter(character, currentChunkSize)
               : encodeCharacter(character, currentChunkSize);
        }
    }
    return encodedData;
}

function countCharacter(character: string, startIndex: number, data: string): number {
    let count = 0;
    let currentIndex = startIndex;
    while (character === data[currentIndex++]) {
        count++;
    }
    return count;
}

function encodeEscapeCharacter(character: string, amount: number): string {
    return `#${String.fromCharCode(amount - 1)}#`;
}

function encodeCharacter(character: string, amount: number): string {
    if (amount < 3) {
        return character.repeat(amount);
    }
    return `#${String.fromCharCode(amount - 3)}${character}`;
}

export function decode(data: string): string {
    const pattern = /^#(.)(.)$/s;
    let decodedData = "";
    for (let i = 0; i < data.length; i++) {
        if (i + 2 >= data.length) {
            decodedData += data[i];
            continue;
        }
        const dataSlice = data.slice(i, i + 3);
        const matchResult = dataSlice.match(pattern);
        if (matchResult === null) {
            decodedData += data[i];
            continue;
        }
        i += 2;
        const rawAmount = matchResult[1].charCodeAt(0);
        const character = matchResult[2];
        if (character === '#') {
            const amount = rawAmount + 1;
            validateEscapeAmount(amount, character, i - 2);
            decodedData += decodeEscapeCharacter(character, amount);
            continue;
        }
        const amount = rawAmount + 3;
        validateCharacterAmount(amount, character, i - 2);
        decodedData += decodeCharacter(character, amount);
    }
    return decodedData;
}

function validateEscapeAmount(amount: number, character: string, index: number) {
    if (amount < 0 || amount > ESCAPE_CHUNK_SIZE) {
        throw new Error(`Amount "${amount} " not valid for character "${character}" at index "${index}"`)
    }
}

function validateCharacterAmount(amount: number, character: string, index: number) {
    if (amount < 0 || amount > CHAR_CHUNK_SIZE) {
        throw new Error(`Amount "${amount} " not valid for character "${character}" at index "${index}"`)
    }
}

function decodeEscapeCharacter(character: string, amount: number): string {
    return character.repeat(amount);
}

function decodeCharacter(character: string, amount: number): string {
    return character.repeat(amount);
}