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
const GameFlow = (function () {
    const play = (name1,name2) => {
        let turn = true
        let win = false
        let full = false
        Gameboard.reset()
        const player1 = createPlayer(name1)
        const player2 = createPlayer(name2)
        while (!win && !full) {
            pos = Number(prompt())
            if (turn && Gameboard.empty(pos)){
                Gameboard.playX(pos)
                turn = false
                console.log(player1.name+" "+pos)
                win = Gameboard.win()
                full = Gameboard.full()
            }
            else if(!turn && Gameboard.empty(pos)){
                Gameboard.playO(pos)
                turn = true
                console.log(player2.name+" "+pos)
                win = Gameboard.win()
                full = Gameboard.full()
            }
        }
        console.log(full ? "Tie" : (turn ? `${player2.name} won` : `${player1.name} won`))
    }
    return {play}
})();