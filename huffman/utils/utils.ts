class Node {
    constructor(public char: string, public freq: number, public left: Node | null = null, public right: Node | null = null) {}
    isLeaf(): boolean {
        return this.left === null && this.right === null;
    }
}

export function huffman(data: string): Map<string, string> {
    const frequencies: Record<string, number> = {};
    for (const char of data) {
        if (frequencies[char]) {
            frequencies[char]++;
        } else {
            frequencies[char] = 1;
        }
    }

    frequencies['\0'] = 0;

    const pq: Node[] = Object.keys(frequencies).map(char => new Node(char, frequencies[char])).sort((a, b) => a.freq - b.freq);

    while (pq.length > 1) {
        const left = pq.shift()!;
        const right = pq.shift()!;
        const node = new Node(left.char + right.char, left.freq + right.freq, left, right);
        pq.push(node);
        pq.sort((a, b) => a.freq - b.freq);
    }

    const root = pq[0];
    const huffmanCodes: Map<string, string> = new Map();
    generateHuffmanCodes(root, '', huffmanCodes);
    return huffmanCodes;
}

function generateHuffmanCodes(node: Node, code: string, huffmanCodes: Map<string, string>) {
    if (node.isLeaf()) {
        huffmanCodes.set(node.char, code);
    } else {
        generateHuffmanCodes(node.left!, code + '0', huffmanCodes);
        generateHuffmanCodes(node.right!, code + '1', huffmanCodes);
    }
}

export function decode(encoded: string, huffmanCodes: Map<string, string>): string {
    let decoded = '';
    let code = '';
    for (const bit of encoded) {
        code += bit;
        for (const [char, huffmanCode] of huffmanCodes) {
            if (code === huffmanCode) {
                decoded += char;
                code = '';
                break;
            }
        }
    }
    return decoded;
}

export function encode(data: string, huffmanCodes: Map<string, string>): string {
    let encoded = '';
    for (const char of data) {
        encoded += huffmanCodes.get(char);
    }
    return encoded;
}