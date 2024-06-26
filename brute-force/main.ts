function findSubstring(s: string, pattern: string): number {
    const n = s.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
            if (s[i + j] !== pattern[j]) {
                break;
            }
        }

        if (j === m) {
            return i;  // substring found at index i
        }
    }

    return -1;  // substring not found
}

const data = 'anananas';
const pattern = 'ananas';
console.log(findSubstring(data, pattern));