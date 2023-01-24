import { useState } from "react";
import { generateId } from "./utils/generateId";

import "./App.css";

import { useDispatch } from "react-redux";
import { addData } from "./features/dataSlice";

import { generateMove } from "./utils/randomMove";
import InfoContainer from "./components/InfoContainer";
import GridContainer from "./components/GridContainer";

import app from "./database/firebaseConfig";
import {
    addDoc,
    getFirestore,
    collection,
    getDocs,
} from "firebase/firestore/lite";
import moment from "moment/moment";
const db = getFirestore(app);

function App() {
    const [userMove, setUserMove] = useState(generateMove());
    const [moves, setMoves] = useState(["", "", "", "", "", "", "", "", ""]);
    const [pizzaMoves, setPizzaMoves] = useState([]);
    const [leafMoves, setLeafMoves] = useState([]);
    const [winner, setWinner] = useState(null);
    const dispatch = useDispatch();

    async function handle(obj) {
        dispatch(addData(obj));

        try {
            const docRef = await addDoc(collection(db, "matches"), obj);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        const querySnapshots = await getDocs(collection(db, "matches"));
        querySnapshots.forEach((doc) => {
            console.log(doc.id);
        });
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

        let hasLeafWon = verifyWinner(arrayLeaf);
        let hasPizzaWon = verifyWinner(arrayPizza);

        if (hasLeafWon) {
            resetWinner("Leaf");
        }

        if (hasPizzaWon) {
            resetWinner("Pizza");
        }

        if (leafMoves.length + pizzaMoves.length >= 9) {
            if (!hasPizzaWon & !hasLeafWon) {
                resetWinner("Nobody won");
            }
        }
    }

    function resetWinner(winner) {
        let obj = {
            id: generateId(8),
            winner: winner,
            time: moment().calendar(),
        };
        setWinner(winner);
        setPizzaMoves([]);
        setLeafMoves([]);
        setMoves(["", "", "", "", "", "", "", "", ""]);
        handle(obj);
    }

    function verifyWinner(arrayItem) {
        let winner = null;
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
            <InfoContainer
                userMove={userMove}
                winner={winner}
                resetWinner={resetWinner}
            />
            <GridContainer moves={moves} handleMove={handleMove} />
        </div>
    );
}

export default App;
