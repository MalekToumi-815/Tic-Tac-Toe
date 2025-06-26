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
        let turn = true
        let win = false
        let full = false
    let player1 
    let player2 
    const setplayers = (p1,p2) => {
        player1 = p1
        player2 = p2
    }
    const play = () => {
        turn = true
        win = false
        full = false
        Gameboard.reset()
        DisplayController.reset()
    }
    DisplayController.board.addEventListener("click",(e) => {
        if (win || full) return;
        pos = e.target.dataset.index
        if (turn && Gameboard.empty(pos)){
            Gameboard.playX(pos)
            DisplayController.playX(e.target)
            turn = false
            console.log(player1.name+pos)
            win = Gameboard.win()
            full = Gameboard.full()
        }
        else if(!turn && Gameboard.empty(pos)){
            Gameboard.playO(pos)
            DisplayController.playO(e.target)
            turn = true
            console.log(player2.name+pos)
            win = Gameboard.win()
            full = Gameboard.full()
        }
        if (win) {
            console.log((turn ? "player2 won" : "player1 won"))
            document.getElementById("winnerMessage").innerText = "Congratulations!!";
            document.querySelector("#winnerDialog p").innerText = turn ? `${player2.name} won!` : `${player1.name} won!`
            document.getElementById("winnerDialog").showModal();            
        }
        else if (full) {
            console.log("Tie")
            document.getElementById("winnerMessage").innerText = "It's a tie!";
            document.querySelector("#winnerDialog p").innerText = ""
            document.getElementById("winnerDialog").showModal();
        }
    })
    return {play , setplayers}
})();
// Dialog logic
const dialog = document.querySelector("#nameDialog")
const form = document.querySelector("#playerForm")
dialog.showModal();

form.addEventListener("submit", () => {
    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();

    document.getElementById("p1").innerText = player1
    document.getElementById("p2").innerText = player2

    console.log("Player 1:", player1);
    console.log("Player 2:", player2);

    GameFlow.setplayers(createPlayer(player1),createPlayer(player2))        
    GameFlow.play()
    
});