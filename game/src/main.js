const LIFE_COLOR = 'coral';
const GAME_CELL_CLASS = '.game-cell';
const GAME_BOARD_CLASS = '.game-board';
const GAME_START_BUTTON_CLASS = '.game-start';
const GAME_END_BUTTON_CLASS = '.game-end';
const EPOCHA_TIME_CLASS = '.epocha-time';
const ANIMATION_INTERVAL_MS = 25;
const MATRIX_ROW_AMOUNT = 20;
const MATRIX_COLUMN_AMOUNT = 20;

const gameStart = document.querySelector(GAME_START_BUTTON_CLASS);
const gameEnd = document.querySelector(GAME_END_BUTTON_CLASS);
const gameBoard = document.querySelector(GAME_BOARD_CLASS);
const epochaTime = document.querySelector(EPOCHA_TIME_CLASS);
const gameBoardCellMatrix = getBoardCellMatrix();

gameBoard.addEventListener('click', (event) => {
    const gameBoardCell = event.target;
    if (isCellAlive(gameBoardCell)) {
        markCellDeath(gameBoardCell);
        return;
    }
    markCellAlive(gameBoardCell);
});

gameStart.addEventListener('click', (event) => {
    const button = event.currentTarget;
    if (isButtonActive(button)) {
        return;
    }
    button.dataset.isActive = 'true';
    gameEnd.dataset.isActive = 'false';
    animate();
});
gameEnd.addEventListener('click', (event) => {
    const button = event.currentTarget;
    if (isButtonActive(button)) {
        return;
    }
    button.dataset.isActive = 'true';
    gameStart.dataset.isActive = 'false';
});

function animate() {
    const deltaRow = [-1, -1, -1, 0, 0, 1, 1, 1];
    const deltaColumn = [-1, 0, 1, -1, 1, -1, 0, 1];
    let isChanged = false;
    for (let i = 0; i < MATRIX_ROW_AMOUNT; i++) {
        for (let j = 0; j < MATRIX_COLUMN_AMOUNT; j++) {
            let liveNeighbours = 0;
            for (let k = 0; k < deltaColumn.length; k++) {
                let ni = i + deltaRow[k];
                let nj = j + deltaColumn[k];
                ni = ni < 0 ? MATRIX_ROW_AMOUNT - 1 : ni;
                ni = ni >= MATRIX_ROW_AMOUNT ? 0 : ni;
                nj = nj < 0 ? MATRIX_COLUMN_AMOUNT - 1 : nj;
                nj = nj >= MATRIX_COLUMN_AMOUNT ? 0 : nj;
                if (isCellAlive(gameBoardCellMatrix[ni][nj])) {
                    liveNeighbours++;
                }
            }
            if (isCellAlive(gameBoardCellMatrix[i][j]) && (liveNeighbours < 2 || liveNeighbours > 3)) {
                isChanged = true;
                requestAnimationFrame(() => { markCellDeath(gameBoardCellMatrix[i][j]) });
                continue;
            }
            if (!isCellAlive(gameBoardCellMatrix[i][j]) && liveNeighbours === 3) {
                isChanged = true;
                requestAnimationFrame(() => { markCellAlive(gameBoardCellMatrix[i][j]) });
            }
        }
    }
    if (!isChanged) {
        setTimeout(() => { alert('Animation was finished with success!') });
        gameStart.dataset.isActive = 'false';
        return;
    }
    setTimeout(() => {
        if (isButtonActive(gameStart)) {
            animate();
        }
    }, ANIMATION_INTERVAL_MS);
}

function getBoardCellMatrix() {
    const gameBoardCellList = document.querySelectorAll(GAME_CELL_CLASS);
    const gameBoardCellMatrix = [];
    for (let i = 0; i < MATRIX_ROW_AMOUNT; i++) {
        gameBoardCellMatrix[i] = [];
        for (let j = 0; j < MATRIX_COLUMN_AMOUNT; j++) {
            gameBoardCellMatrix[i][j] = gameBoardCellList[i*MATRIX_COLUMN_AMOUNT + j];
        }
    }
    return gameBoardCellMatrix;
}

function isCellAlive(cell) {
    return cell.dataset.isAlive === 'true';
}

function isButtonActive(button) {
    return button.dataset.isActive === 'true';
}

function markCellAlive(cell) {
    cell.style.backgroundColor = LIFE_COLOR;
    cell.dataset.isAlive = 'true';
}

function markCellDeath(cell) {
    cell.style.backgroundColor = '';
    cell.dataset.isAlive = 'false';
}
