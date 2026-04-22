import { t } from '../i18n.js';

export function initTicTacToe(container) {
  let board = Array(9).fill(null);
  const player = 'X';
  const ai = 'O';

  container.innerHTML = `
    <h2 class="section-title">${t('tttTitle')}</h2>
    <p class="description">${t('tttGameDesc')}</p>
    <div class="ttt-grid" id="ttt-board">
      ${board.map((_, i) => `<div class="ttt-cell" data-index="${i}"></div>`).join('')}
    </div>
    <div style="text-align: center;">
      <button class="btn-primary" id="reset-ttt">${t('resetGame')}</button>
      <p id="ttt-status" style="margin-top: 1rem; font-weight: 600;"></p>
    </div>
  `;

  const cells = container.querySelectorAll('.ttt-cell');
  const statusEl = container.querySelector('#ttt-status');
  const resetBtn = container.querySelector('#reset-ttt');

  function checkWinner(b) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      if (b[line[0]] && b[line[0]] === b[line[1]] && b[line[0]] === b[line[2]]) {
        return b[line[0]];
      }
    }
    return b.includes(null) ? null : 'draw';
  }

  function minimax(b, depth, isMaximizing) {
    const result = checkWinner(b);
    if (result === ai) return 10 - depth;
    if (result === player) return depth - 10;
    if (result === 'draw') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!b[i]) {
          b[i] = ai;
          let score = minimax(b, depth + 1, false);
          b[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!b[i]) {
          b[i] = player;
          let score = minimax(b, depth + 1, true);
          b[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function aiMove() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = ai;
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    makeMove(move, ai);
  }

  function makeMove(index, p) {
    if (board[index] || checkWinner(board)) return;
    board[index] = p;
    cells[index].textContent = p;
    cells[index].classList.add(p.toLowerCase());

    const result = checkWinner(board);
    if (result) {
      statusEl.textContent = result === 'draw' ? t('draw') : `${t('winner')}: ${result}`;
      return;
    }

    if (p === player) {
      setTimeout(aiMove, 300);
    }
  }

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const idx = cell.dataset.index;
      if (!board[idx] && !checkWinner(board)) {
        makeMove(idx, player);
      }
    });
  });

  resetBtn.addEventListener('click', () => {
    board = Array(9).fill(null);
    cells.forEach(c => {
      c.textContent = '';
      c.className = 'ttt-cell';
    });
    statusEl.textContent = '';
  });
}
