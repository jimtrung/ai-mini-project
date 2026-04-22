import { t } from '../i18n.js';

export function initSudoku(container) {
  container.innerHTML = `
    <h2 class="section-title">${t('sudokuTitle')}</h2>
    <p class="description">${t('sudokuGameDesc')}</p>
    
    <div class="sudoku-grid" id="sudoku-grid">
      ${Array(81).fill(0).map((_, i) => `<input type="number" min="1" max="9" class="sudoku-cell" data-index="${i}">`).join('')}
    </div>

    <div style="text-align: center; display: flex; justify-content: center; gap: 1rem;">
      <button class="btn-primary" id="solve-sudoku">${t('solve')}</button>
      <button class="btn-primary" id="clear-sudoku" style="background: var(--glass);">${t('clear')}</button>
      <button class="btn-primary" id="preset-sudoku" style="background: var(--glass);">${t('preset')}</button>
    </div>
    <p id="sudoku-status" style="text-align: center; margin-top: 1rem;"></p>
  `;

  const cells = container.querySelectorAll('.sudoku-cell');
  const statusEl = container.querySelector('#sudoku-status');

  function getBoard() {
    return Array.from(cells).map(c => parseInt(c.value) || 0);
  }

  function setBoard(board, originalBoard = []) {
    board.forEach((val, i) => {
      cells[i].value = val || '';
      if (originalBoard.length > 0 && originalBoard[i] === 0 && val !== 0) {
        cells[i].classList.add('ai-solved');
      } else {
        cells[i].classList.remove('ai-solved');
      }
    });
  }

  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row * 9 + i] === num) return false;
      if (board[i * 9 + col] === num) return false;
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[(startRow + i) * 9 + (startCol + j)] === num) return false;
      }
    }
    return true;
  }

  function findMRV(board) {
    let minVals = 10;
    let bestCell = -1;
    for (let i = 0; i < 81; i++) {
      if (board[i] === 0) {
        let count = 0;
        let r = Math.floor(i / 9);
        let c = i % 9;
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, r, c, num)) count++;
        }
        if (count < minVals) {
          minVals = count;
          bestCell = i;
        }
      }
    }
    return bestCell;
  }

  function solve(board) {
    let cell = findMRV(board);
    if (cell === -1) return true;

    let r = Math.floor(cell / 9);
    let c = cell % 9;

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, r, c, num)) {
        board[cell] = num;
        if (solve(board)) return true;
        board[cell] = 0;
      }
    }
    return false;
  }

  container.querySelector('#solve-sudoku').addEventListener('click', () => {
    let originalBoard = getBoard();
    let board = [...originalBoard];
    statusEl.textContent = t('solving');
    
    // Validate initial state
    for(let i=0; i<81; i++) {
      if(board[i] !== 0) {
        let val = board[i];
        board[i] = 0;
        if(!isValid(board, Math.floor(i/9), i%9, val)) {
          statusEl.textContent = t('invalidState');
          board[i] = val;
          return;
        }
        board[i] = val;
      }
    }

    if (solve(board)) {
      setBoard(board, originalBoard);
      statusEl.textContent = t('solved');
    } else {
      statusEl.textContent = t('noSolution');
    }
  });

  container.querySelector('#clear-sudoku').addEventListener('click', () => {
    cells.forEach(c => c.value = '');
    statusEl.textContent = '';
  });

  container.querySelector('#preset-sudoku').addEventListener('click', () => {
    const preset = [
      5, 3, 0, 0, 7, 0, 0, 0, 0,
      6, 0, 0, 1, 9, 5, 0, 0, 0,
      0, 9, 8, 0, 0, 0, 0, 6, 0,
      8, 0, 0, 0, 6, 0, 0, 0, 3,
      4, 0, 0, 8, 0, 3, 0, 0, 1,
      7, 0, 0, 0, 2, 0, 0, 0, 6,
      0, 6, 0, 0, 0, 0, 2, 8, 0,
      0, 0, 0, 4, 1, 9, 0, 0, 5,
      0, 0, 0, 0, 8, 0, 0, 7, 9
    ];
    setBoard(preset);
    statusEl.textContent = t('presetLoaded');
  });
}
