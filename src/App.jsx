import { useState } from "react";
import { generateId } from "./utils/generateId";

import { useSelector, useDispatch } from "react-redux";
import { addData } from "./features/dataSlice";

import "./App.css";
import { generateMove } from "./utils/randomMove";
import InfoContainer from "./components/InfoContainer";
import GridContainer from "./components/GridContainer";

function App() {
    const [userMove, setUserMove] = useState(generateMove());
    const [moves, setMoves] = useState(["", "", "", "", "", "", "", "", ""]);
    const [pizzaMoves, setPizzaMoves] = useState([]);
    const [leafMoves, setLeafMoves] = useState([]);
    const [winner, setWinner] = useState(null);
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();
    console.log(data);

    function handle(obj) {
        dispatch(addData(obj));
    }

    function handleMove(pos) {
        if (moves[pos] === "") {
            let data = moves;
            data[pos] = {
                pos,
                userMove,
            };
            setMoves([...data]);
            if (userMove === "leaf") {
                setLeafMoves([...leafMoves, pos].sort());
            } else {
                setPizzaMoves([...pizzaMoves, pos].sort());
            }
            userMove === "pizza" ? setUserMove("leaf") : setUserMove("pizza");
        }
    }

    if (leafMoves.length + pizzaMoves.length >= 5) {
        let arrayLeaf = [
            [leafMoves.slice(0, 3)],
            [leafMoves.slice(1, 4)],
            [leafMoves.slice(2, 5)],
            [(pizzaMoves[0], pizzaMoves[1], pizzaMoves[3])],
        ];
        let arrayPizza = [
            [pizzaMoves.slice(0, 3)],
            [pizzaMoves.slice(1, 4)],
            [pizzaMoves.slice(2, 5)],
            [(pizzaMoves[0], pizzaMoves[1], pizzaMoves[3])],
        ];

        let arrayWins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [2, 5, 8],
            [1, 4, 7],
            [0, 3, 6],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let hasLeafWon = verifyWinner(arrayLeaf, arrayWins);
        let hasPizzaWon = verifyWinner(arrayPizza, arrayWins);

        if (hasLeafWon) {
            let obj = {
                id: generateId(8),
                winner: "Leaf",
            };
            handle(obj);
            setPizzaMoves([]);
            setLeafMoves([]);
            setWinner("Leaf");
            setMoves(["", "", "", "", "", "", "", "", ""]);
        }

        if (hasPizzaWon) {
            let obj = {
                id: generateId(8),
                winner: "Pizza",
            };
            setPizzaMoves([]);
            setLeafMoves([]);

            handle(obj);
            setWinner("Pizza");
            setMoves(["", "", "", "", "", "", "", "", ""]);
        }

        if (leafMoves.length + pizzaMoves.length >= 9) {
            if (!hasPizzaWon & !hasLeafWon) {
                setWinner("Nobody won");
                setPizzaMoves([]);
                setLeafMoves([]);
                let obj = {
                    id: generateId(8),
                    winner: "no winner",
                };
                handle(obj);
                setMoves(["", "", "", "", "", "", "", "", ""]);
            }
        }
    }

    function verifyWinner(arrayItem, arrayWins) {
        let winner = null;
        for (let i = 0; i < arrayItem.length; i++) {
            for (let y = 0; y < arrayWins.length; y++) {
                if (arrayItem[i].toString() == arrayWins[y].toString()) {
                    winner = true;
                }
            }
        }
        return winner;
    }

    return (
        <div className="App">
            <InfoContainer userMove={userMove} winner={winner} />
            <GridContainer moves={moves} handleMove={handleMove} />
        </div>
    );
}

export default App;
