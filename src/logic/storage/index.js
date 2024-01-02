// Recibe 2 props
export const saveGameToStorage = ({ board, turn }) => {
    // Almacena la variable (board) y (turn) en local storage
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn);
}

// Elimina las variables de local storage
export const resetGameStorage = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
}