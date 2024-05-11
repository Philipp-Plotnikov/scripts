function caesarCipher(text: string, shift: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    text = text.toLowerCase().trim()
    let cipherText = '';

    for (const char of text) {
        const isLetter = alphabet.includes(char);
        if (isLetter) {
            const oldIndex = alphabet.indexOf(char);
            const newIndex = (oldIndex + shift) % alphabet.length;
            cipherText += alphabet[newIndex];
        } else {
            cipherText += char;
        }
    }

    return cipherText;
}

function frequencyAnalysis(cipherText: string): string {
    const englishFrequencies = {
        'e': 12.7,
        't': 9.1,
        'a': 8.2,
        'o': 7.5,
        'i': 7.0,
        'n': 6.7,
        's': 6.3,
        'h': 6.1,
        'r': 6,
        'd': 4.3,
        'l': 4,
        'c': 2.8,
        'u': 2.8,
        'm': 2.4,
        'w': 2.4,
        'f': 2.2,
        'g': 2,
        'y': 2,
        'p': 1.9,
        'b': 1.5,
        'v': 0.98,
        'k': 0.77,
        'j': 0.15,
        'x': 0.15,
        'q': 0.095,
        'z': 0.074,
    };
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetLength = alphabet.length;
    let frequencies = {
        'e': 0,
        't': 0,
        'a': 0,
        'o': 0,
        'i': 0,
        'n': 0,
        's': 0,
        'h': 0,
        'r': 0,
        'd': 0,
        'l': 0,
        'c': 0,
        'u': 0,
        'm': 0,
        'w': 0,
        'f': 0,
        'g': 0,
        'y': 0,
        'p': 0,
        'b': 0,
        'v': 0,
        'k': 0,
        'j': 0,
        'x': 0,
        'q': 0,
        'z': 0,
    };
    let decipheredText = '';
    const cyptherTextLength = cipherText.length;
    let shift = 0;

    let tempFrequencies = {};
    for (const char of cipherText) {
        if (!alphabet.includes(char)) {
            continue;
        }
        if (tempFrequencies[char] === undefined) {
            tempFrequencies[char] = 1;
            continue;
        }
        tempFrequencies[char]++;
    }
    for (const key in tempFrequencies) {
        frequencies[key] = tempFrequencies[key] / cyptherTextLength * 100;
    }

    let minSum = +Infinity;
    for (let i = 0; i < alphabetLength; i++) {
        let sum = 0;
        for (const char of alphabet) {
            const oldIndex = alphabet.indexOf(char);
            const newIndex = (oldIndex + i) % alphabetLength;
            const newChar = alphabet[newIndex];
            sum += Math.pow(englishFrequencies[char] - frequencies[newChar], 2);
        }
        if (sum < minSum) {
            minSum = sum;
            shift = i;
        }
    }
    let oldIndex = 0;
    let newIndex = 0;
    for (const char of cipherText) {
        if (alphabet.includes(char)) {
            oldIndex = alphabet.indexOf(char);
            newIndex = oldIndex - shift;
            if (newIndex >= 0) {
                newIndex = newIndex % alphabetLength;
            } else {
                newIndex = alphabetLength + newIndex;
            }
            decipheredText += alphabet[newIndex];
        } else {
            decipheredText += char;
        }
    }
    return decipheredText;
}

let text = 'the quick brown fox jumps over the lazy dog';
const shift = 3;
const ciphertext = caesarCipher(text, shift);
console.log(ciphertext);
text = frequencyAnalysis(ciphertext);
console.log(text); 