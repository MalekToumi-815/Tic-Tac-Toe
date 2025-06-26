//Game Logic
const Gameboard = (function () {
    let gameboard = ["","","","","","","","",""]
    const playX = (pos) => gameboard[pos] = "X"
    const playO = (pos) => gameboard[pos] = "O"
    const reset = () => {
        for (let i = 0; i < gameboard.length; i++) gameboard[i] = "";
    }
    const full = () => {
        for (let i = 0; i < gameboard.length; i++) 
            if (gameboard[i] === "")
                return false
        return true
    }
    const win = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winPatterns.some(([a, b, c]) =>
            gameboard[a] !== "" &&
            gameboard[a] === gameboard[b] &&
            gameboard[a] === gameboard[c]
        );
    };
    const empty = (pos) => gameboard[pos] === ""
    return { playX, playO, reset, full, win, empty }
})();
function createPlayer (name) {
    return {name}
}
const DisplayController = (function () {
    let board = document.querySelector(".gameboard")
    let cells = document.querySelectorAll(".cell")
    const reset = () => {
        cells.forEach(cell => {
            if (cell.classList.contains("o")) cell.classList.remove("o")
            if (cell.classList.contains("x")) cell.classList.remove("x")
        })
    }
    const playX = (cell) => {cell.classList.add('x')}
    const playO = (cell) => {cell.classList.add('o')}
    return {board , playX , playO , reset}
})();
const GameFlow = (function () {
    const play = () => {
        let turn = true
        let win = false
        let full = false
        Gameboard.reset()
        DisplayController.reset()
        DisplayController.board.addEventListener("click",(e) => {
            if (win || full) return;
            pos = e.target.dataset.index
            if (turn && Gameboard.empty(pos)){
                Gameboard.playX(pos)
                DisplayController.playX(e.target)
                turn = false
                console.log("player1 "+pos)
                win = Gameboard.win()
                full = Gameboard.full()
            }
            else if(!turn && Gameboard.empty(pos)){
                Gameboard.playO(pos)
                DisplayController.playO(e.target)
                turn = true
                console.log("player2+ "+pos)
                win = Gameboard.win()
                full = Gameboard.full()
            }
            if (full) console.log("Tie")
            else if (win) console.log((turn ? "player2 won" : "player1 won"))
        })
    }
    return {play}
})();
GameFlow.play()