// does packet exist or is it shot
let target = [];

// packet position
let targetPosition = [];

// is bullet shot or not
let ammo = [];


// configuration for different game params
const ID = 12345;
let n = ID % 3;
const k = 3 - n;
const m = (n >= k) ? 3 : 2;
let N1 = (9 + n); // row = i
let N2 = (9 + k); // column = j
let speed = 2 + m;
let score, size;


function initGame() {
    speed = 2 + m;
    score = 0;
    n = N2;
    size = n;
    target = [...Array(size+1).fill(1)];
    targetPosition = [...Array(size + 1).fill(0)];
    n = N1;
    ammo = [...Array(size).fill(1)];
    let gameBoard = document.getElementById("gameBoard");

    for (let i = 0; i < N1 + 2; i++) {
        let row = gameBoard.insertRow(-1);
        for (let j = 0; j < N2 + 1; j++) {
            let cell = row.insertCell(-1);
            cell.id = i + "." + j;
            cell.className = "cell";
            row.id = i;
            cell.innerHTML = " ";
            if ((i === 0) && (j > 0)) {
                cell.style.background = "green";
            }
            if ((i > 0) && (j === 0) && (i != N1 + 1)) {
                cell.style.background = "yellow";
                cell.addEventListener("click", function () {
                    if (ammo[i] == 1) {
                        cell.style.background = "silver";
                        gameMove();
                        ammo[i] = 0;
                        for (let k = 1; k <= size; k++) {
                            if (targetPosition[k] == i) {
                                target[k] = 0;
                                document.getElementById(i + "." + k).style.background = "red";
                                document.getElementById("score").innerHTML = ++score;
                            }
                        }
                    }
                });
            }
        }
    }
}

function gameMove() {
    for(let i=1;i<=N2+1;i++) {
        if(target[i]==1)
            packetMove(i);
    }
}

function packetMove(j) {
    let n = Math.floor(Math.random() * speed);
    let i = targetPosition[j];
    let m = Math.min(i + n, size);
    let oldPacketPosition = document.getElementById(i + "." + j);
    let newPacketPosition = document.getElementById(m + "." + j);
    oldPacketPosition.style.background = "white";
    newPacketPosition.style.background = "green";
    targetPosition[j] = m;
    if (targetPosition[j] == size) {
        target[j] = 0;
    }
}

function startGame() {
    score = 0;
    document.getElementById("score").innerHTML = score;
    document.getElementById("gameBoard").innerHTML = "";
    initGame();
}