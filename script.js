const arr = [];
const n = 20;

const init = () => {
    for(var i = 0; i < n; i++)
    {
        arr[i] = Math.random();
    }

    showBars();
}

const play = (id) => {
    const cpy_arr = [...arr]; //copy arr
    var moves = [];
    
    if(id == 1) {
        moves = bubbleSort(cpy_arr);
    }
    else if(id == 2) {
        moves = selectionSort(cpy_arr);
    }
    else if(id == 3) {
        moves = bubbleSort(cpy_arr);
    }

    animate(moves);

}

const animate = (moves) => {
    if(moves.length == 0)     
    {
        showBars();
        return;
    }

    const move = moves.shift(0);
    const [i, j] = move.indices;

    if(move.type == "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    showBars(move);

    setTimeout(() => {
        animate(moves);
    }, 100);
}

//sorts cpy_arr and returns an array containing pairs of index which are moves during sorting
const bubbleSort = (cpy_arr) => {
    const moves = [];

    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            //comparing the two indices 
            moves.push({
                indices: [j, j + 1],
                type: "comp"
            })

            if(cpy_arr[j] > cpy_arr[j + 1]) 
            {
                [cpy_arr[j], cpy_arr[j + 1]] = [cpy_arr[j + 1], cpy_arr[j]];

                //swapping the two indices
                moves.push({
                    indices: [j, j + 1],
                    type: "swap"
                });
            }
        }
    }

    return moves;
}

//sorts cpy_arr and returns an array containing pairs of index which are moves during sorting
const selectionSort = (cpy_arr) => {
    const moves = [];

    for (var i = 0; i < n - 1; i++) {
        var minIdx = i;
        
        for (var j = i + 1; j < n; j++) {
            //comparing the two indices 
            moves.push({
                indices: [j, minIdx],
                type: "comp"
            });

            if(cpy_arr[j] < cpy_arr[minIdx]) 
            {
                minIdx = j;
            }    
        }

        [cpy_arr[minIdx], cpy_arr[i]] = [cpy_arr[i], cpy_arr[minIdx]];

        //swapping the two indices
        moves.push({
            indices: [minIdx, i],
            type: "swap"
        });
    }

    return moves;
}


const showBars = (move) => {
    container.innerHTML = ""

    for(var i = 0; i < arr.length; i++)
    {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (arr[i] * 100) + "%";

        if(move && move.indices.includes(i)) {
            bar.style.backgroundColor = (move.type == "swap") ? "red" : "blue";
        }
    
        container.appendChild(bar)
    }

}

init();
