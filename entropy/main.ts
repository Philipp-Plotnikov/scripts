interface Entropy {
    e2: number;
    ea: number;
    i: number;
}

function entropy(data: string): Entropy {
    if (data.length === 0) {
        throw new Error('Data is empty');
    }
    const alphabet = new Set(data);
    const m = alphabet.size;
    const n = data.length;
    if (n === 1 && m === 1) {
        return {
            e2: 1,
            ea: 1,
            i: 1,
        }
    }
    if (n === 2 && m === 1) {
        return {
            e2: 0,
            ea: 0,
            i: 0,
        }
    }
    const frequences = getFrequences(alphabet, data);
    const e2 = getE2(frequences);
    if (n === m) {
        const specificValue = 1/n;
        const allEqual = frequences.every(value => value === specificValue);
        if (allEqual) {
            return {
                e2,
                ea: 1,
                i: getI(e2, n),
            }
        
        }
    }
    return {
        e2,
        ea: getEa(frequences, m),
        i: getI(e2, n),
    }
}

function getFrequences(alphabet: Set<string>, data: string): number[] {
    const frequencies: Record<string, number> = {};
    for (let char of alphabet) {
        frequencies[char] = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === char) {
                frequencies[char]++;
            }
        }
        frequencies[char] /= data.length;
    }
    return Object.values(frequencies);
}

function getE2(frequences: number[]): number {
    let result = 0;
    for (let i = 0; i < frequences.length; i++) {
        let p = frequences[i];
        result += p * Math.log2(p);
    }
    return -result;
}

function getEa(frequences: number[], m: number): number {
    let result = 0;
    for (let i = 0; i < frequences.length; i++) {
        let p = frequences[i];
        result += p * (Math.log2(p)/Math.log2(m));
    }
    return -result;
}

function getI(e2: number, n: number): number {
    return e2*n;
}

const example1 = "мама мыла раму";
const example2 = "aa";
const example3 = "a";
const example4= "";

console.log(entropy(example1));
console.log(entropy(example2));
console.log(entropy(example3));
try {
    console.log(entropy(example4));
} catch (e) {
    console.log(e.message);
}
