import Confetti from 'react-dom-confetti';
import styles from './App.module.scss';
import Board from './components/Board/Board';
import { useTicTacToeStore } from './store/TitTacToeStore';

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};



function App() {
  const {
    board,
    nextPlayer,
    move,
    winner,
    restart
  } = useTicTacToeStore();

  return (
    <div className={styles.App}>
      <h1>Tic Tac Toe</h1>

      {winner ? <><p>
        The winner is: <b>{winner}</b>
        <br /><br />
        <button onClick={restart}>Restart</button>
        <br />
      </p>

      </> : <p>
        Next player: <b>{nextPlayer}</b>
      </p>}

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}><Confetti active={!!winner} config={config} /></div>

      <Board board={board} move={move} />
    </div>
  )
}

export default App
