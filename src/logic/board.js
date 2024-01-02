import { WINNER_COMBOS } from "../constants";

// Verifica al ganador de la partida
export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        // Almacena en este array de 3 elementos: las posiciones de cada (combo) recorrido
        //    [0, 1, 2]
        const [a, b, c] = combo;

        if (
            // Almacena X u O
            boardToCheck[a] &&
            // 0 = 1
            boardToCheck[a] === boardToCheck[b] &&
            // 0 = 2
            boardToCheck[a] === boardToCheck[c]
        ) {
            // Retorna X u O, dependiendo el que cumpla las 3 condiciones del if
            return boardToCheck[a];
        }
    }

    // Retorna null, si las 3 condiciones no se cumplen
    return null;
}

// Verifica si hubo empate
export const checkEndGame = (newBoard) => {
    // Si el valor de cada (square) es !== de null, entonces hubo empate y retornara true
    return newBoard.every((square) => square !== null);
}