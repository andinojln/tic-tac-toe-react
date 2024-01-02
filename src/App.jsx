import { useState } from 'react';
// Dependencia efecto confetti
// Install -> npm install canvas-confetti -E
// Execute -> confetti()
import confetti from 'canvas-confetti';

import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js';

// =================================== APP FUNCTION =================================== //

function App() {
    // Estado (board)
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board');
        if (boardFromStorage) return JSON.parse(boardFromStorage);
        return Array(9).fill(null);
        // console.log(board);
    });

    // Estado (turn)
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn');
        return (turnFromStorage) ?? TURNS.X;
    });

    // Estado (winner): por defecto almacena null (no winner), y si almacena false (empate)
    const [winner, setWinner] = useState(null);

    const resetGame = () => {
        // Reset de estados y variables del local storage
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        resetGameStorage();
    }

    const updateBoard = (index) => {
        // Si las posiciones del tablero contienen valor o si hubo ganador: se retorna y finaliza la ejecucion de la funcion
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = turn;
        // Se actualiza el estado
        setBoard(newBoard);
        const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X;
        // Se actualiza el estado
        setTurn(newTurn);
        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        });
        const newWinner = checkWinnerFrom(newBoard);
        if (newWinner) {
            confetti();
            // Se actualiza el estado
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            // Se actualiza el estado
            setWinner(false);
        }
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reiniciar</button>
            <section className='game'>
                {
                    board.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                                >
                                {square}
                            </Square>
                        );
                    })
                }
            </section>
            <section className='turn'>
                <Square
                    isSelected={turn === TURNS.X}
                    >
                    {TURNS.X}
                </Square>
                <Square
                    isSelected={turn === TURNS.O}
                    >
                    {TURNS.O}
                </Square>
            </section>
            <WinnerModal
                resetGame={resetGame}
                winner={winner}
            />
        </main>
    );
}

export default App;