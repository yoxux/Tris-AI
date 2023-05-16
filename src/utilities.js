const TRIS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkTris(board) {
  for (const [a, b, c] of TRIS) {
    if (board[a] !== " " && board[a] === board[b] && board[b] === board[c])
      return board[a] + " wins";
  }
  for (const cell of board) if (cell === " ") return false;
  return "Tie!";
}

function minimax(board, isO) {
  const res = checkTris(board);
  if (res === "O wins") return +1;
  if (res === "X wins") return -1;
  if (res === "Tie!") return 0;

  let points, tmpPoint;

  if (isO) {
    points = -Infinity;
    for (let i = 0; i < board.length; ++i) {
      if (board[i] === " ") {
        board[i] = "O";
        tmpPoint = minimax(board, false);
        if (tmpPoint > points) points = tmpPoint;
        board[i] = " ";
      }
    }
  } else {
    points = Infinity;
    for (let i = 0; i < board.length; ++i) {
      if (board[i] === " ") {
        board[i] = "X";
        tmpPoint = minimax(board, true);
        if (tmpPoint < points) points = tmpPoint;
        board[i] = " ";
      }
    }
  }

  return points;
}

export function aiMove(board) {
  // O plays
  let bestMove = null,
    maxScore = -Infinity,
    tmpScore;
  for (let i = 0; i < board.length; ++i) {
    if (board[i] === " ") {
      board[i] = "O";
      tmpScore = minimax(board, false);
      if (tmpScore > maxScore) {
        maxScore = tmpScore;
        bestMove = i;
      }
      board[i] = " ";
    }
  }
  return bestMove;
}
