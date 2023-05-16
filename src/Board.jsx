import React, { useEffect, useState } from "react";
import { checkTris, aiMove } from "./utilities";
import style from "./style.module.css";

function Cell({ children, onClick }) {
  return (
    <button className={style.cell} onClick={onClick}>
      {children}
    </button>
  );
}

export default function Board({ onWin, clearMessage }) {
  const [board, setBoard] = useState(Array(9).fill(" "));
  const [turn, setTurn] = useState(null);
  const [endGame, setEndGame] = useState(false);

  function handleClick(index) {
    const alt = [...board];
    if (alt[index] !== " ") return;
    alt[index] = turn;
    setBoard(alt);
  }

  useEffect(() => {
    if (endGame) return;
    if (!turn) {
      setTurn("O");
      return;
    }

    if (turn === "O") {
      const move = aiMove(board);
      if (move !== null) {
        const alt = [...board];
        alt[move] = "O";
        setBoard(alt);
      }
    }
  }, [turn]);

  useEffect(() => {
    const win = checkTris(board);
    if (win) {
      setEndGame(true);
      onWin(win);
    }
    setTurn((prev) => (prev === "O" ? "X" : "O"));
  }, [board]);

  return (
    <>
      <div className={style.board}>
        {board.map((cell, index) => {
          return (
            <Cell
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            >
              {cell}
            </Cell>
          );
        })}
      </div>
      <button
        className={style.resetButton}
        onClick={() => {
          setBoard(Array(9).fill(" "));
          setTurn(null);
          setEndGame(false);
          clearMessage();
        }}
      >
        Reset
      </button>
    </>
  );
}
