import { Square } from "./Square.jsx";

// Recibe 2 props
export function WinnerModal({ winner, resetGame }) {
    if (winner === null) return null;
    const winnerText = (winner === false) ? 'Empate' : 'Ganó el jugador:';

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
                <header className='win'>
                    {/* Si (winner) es true, se renderizara el componente Square */}
                    {(winner) && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    );
}