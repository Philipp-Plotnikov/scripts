class DFA {
    private readonly transitions: Record<string, number>[] = [];
    private readonly acceptingStates: number[] = [];

    constructor(private readonly pattern: string) {
        this.buildDFA();
    }

    private buildDFA() {
        const m = this.pattern.length;
        this.transitions[0] = {};
        this.transitions[0][this.pattern[0]] = 1;

        for (let x = 0, j = 1; j < m; j++) {
            this.transitions[j] = {...this.transitions[x]};
            this.transitions[j][this.pattern[j]] = j + 1;
            x = this.transitions[x][this.pattern[j]] || 0;
        }

        this.acceptingStates.push(m);
    }

    public nextState(currentState: number, char: string): number {
        return this.transitions[currentState][char] || 0;
    }

    public isAcceptingState(state: number): boolean {
        return this.acceptingStates.includes(state);
    }
}

const data = 'anananas';
const pattern = 'ananas';
const dfa = new DFA(pattern);
let state = 0;
for (let i = 0; i < data.length; i++) {
    state = dfa.nextState(state, data[i]);
    if (dfa.isAcceptingState(state)) {
        console.log('Pattern found at index', i - pattern.length + 1);
    }
}