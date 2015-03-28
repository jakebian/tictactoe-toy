var boardSize = parseInt(window.location.hash.split('#/')[1] || 3);
console.log(boardSize);
var state = [];
var boardElement = document.getElementById('board');
for (var i = 0; i < boardSize; i++) {
    state[i] = [];
    for (var j = 0; j < boardSize; j++ ){
        state[i][j] = {value: 0};
    }
}

render(state);

var firebaseRef = new Firebase("https://ttt-js.firebaseio.com/state/" + boardSize);

firebaseRef.on("value", function(snapshot) {
    val = snapshot.val();
    if (val) {
        console.log(val);
        state = val;
        render(state);
    }
});



function render(state) {
    boardElement.innerHTML = '';
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            renderState(state[i][j], (i + '-' + j));
        }
    }
}

function renderState(square, squareId) {
    var squareElement = document.getElementById(squareId)

    if (!squareElement) {
        squareElement = document.createElement('div');
        boardElement.appendChild(squareElement);
    }

    squareElement.setAttribute('class', 'square');
    squareElement.setAttribute('id', squareId)
    if (square.value) {
        squareElement.setAttribute('class', 'square checked');
    }

    squareElement.onclick = handleClick;

    function handleClick() {
        square.value = !square.value;
        setState();
        renderState(square, squareId);
    }
}

function setState() {
    firebaseRef.set(state);
}
