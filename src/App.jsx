import { useState } from "react";
import Board from "./Board";
import style from "./style.module.css";

function App() {
  const [message, setMessage] = useState(" ");

  function clearMessage() {
    setMessage(" ");
  }

  return (
    <div className={style.container}>
      <h2>{message}</h2>
      <Board
        onWin={(finalMessage) => {
          setMessage(finalMessage);
        }}
        clearMessage={clearMessage}
      />
    </div>
  );
}

export default App;
