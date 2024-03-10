const NOT_REPEATED_CHUNK_SIZE = 127;
const REPEATED_CHUNK_SIZE = 130;

export function encode(data: string): string {
    let encodedData = "";
    for (let i = 0; i < data.length; i++) {
        if (i + 1 === data.length) {
            encodedData += `${String.fromCharCode(0)}${data[i]}`;
            continue;
        }
        if (data[i] === data[i + 1]) {
            const character = data[i];
            const characterAmount = countCharacter(data[i], i, data);
            i += characterAmount - 1;
            const chunkAmount = Math.ceil(characterAmount / REPEATED_CHUNK_SIZE);
            for (let i = 0; i < chunkAmount; i++) {
                const currentChunkSize = (i + 1 == chunkAmount) ? characterAmount - i * REPEATED_CHUNK_SIZE : REPEATED_CHUNK_SIZE;
                encodedData += encodeCharacter(character, currentChunkSize);
            }
            continue;
        }
        let startIndex = i;
        const notRepeatedCharactersAmount = countNotRepeatedCharacters(data, startIndex);
        i += notRepeatedCharactersAmount - 1;
        const chunkAmount = Math.ceil(notRepeatedCharactersAmount / NOT_REPEATED_CHUNK_SIZE);
        for (let i = 0; i < chunkAmount; i++) {
            const currentChunkSize = (i + 1 == chunkAmount) ? notRepeatedCharactersAmount - i * NOT_REPEATED_CHUNK_SIZE : NOT_REPEATED_CHUNK_SIZE;
            encodedData += encodeNotRepeatedCharacters(data.slice(startIndex, startIndex + currentChunkSize), currentChunkSize);
            startIndex += currentChunkSize;
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

function countNotRepeatedCharacters(data: string, startIndex: number): number {
    let count = 0;
    let currentIndex = startIndex;
    while (data[currentIndex] !== data[++currentIndex]) {
        count++;
    }
    return count;
}

function encodeCharacter(character: string, amount: number): string {
    return `${String.fromCharCode(125 + amount)}${character}`;
}

function encodeNotRepeatedCharacters(data: string, amount: number): string {
    return `${String.fromCharCode(amount - 1)}${data}`;
}

export function decode(data: string): string {
    let decodedData = "";
    for (let i = 0; i < data.length; i++) {
        const amount = data[i].charCodeAt(0);
        if (amount >= 127 && amount - 125 <= REPEATED_CHUNK_SIZE) {
            decodedData += decodeCharacter(data[i+1], amount - 125);
            i++;
            continue;
        }
        if (amount >= 0 && amount + 1 <= NOT_REPEATED_CHUNK_SIZE) {
            decodedData += decodeNotRepeatedCharacters(data, i + 1, amount + 1);
            i += amount + 1;
            continue;
        }
        throw new Error(`Amount "${amount} " not valid at index "${i}"`);
    }
    return decodedData;
}

function decodeCharacter(character: string, amount: number): string {
    return character.repeat(amount);
}

function decodeNotRepeatedCharacters(data: string, startIndex: number, amount: number): string {
    return data.slice(startIndex, startIndex + amount);
}