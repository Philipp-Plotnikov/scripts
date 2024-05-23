function shuntingYard(infix: string): string {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];
    const operators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    const infixTokens = infix.split(' ');
    for (const token of infixTokens) {
        if (token in operators) {
            while (operatorStack.length > 0 && operators[operatorStack[operatorStack.length - 1]] >= operators[token]) {
                outputQueue.push(operatorStack.pop() || '');
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop() || '');
            }
            operatorStack.pop();
        } else {
            outputQueue.push(token);
        }
    }
    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop() || '');
    }
    return outputQueue.join(' ');
}

console.log(shuntingYard('3 + 4 * 2 / ( 1 - 5 )'));
console.log(shuntingYard('( A + B ) * ( C + D ) - E'));