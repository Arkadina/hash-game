import { useEffect, useState } from "react";
import { IoMdPizza, IoIosLeaf } from "react-icons/io";
import { generateId } from "./utils/generateId";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "./features/dataSlice";
import { motion } from "framer-motion";

import styled from "styled-components";
import "./App.css";

const Container = styled.div`
    width: 600px;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const SmallContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

function App() {
    const [userMove, setUserMove] = useState("pizza");
    const [moves, setMoves] = useState(["", "", "", "", "", "", "", "", ""]);
    const [pizzaMoves, setPizzaMoves] = useState([]);
    const [leafMoves, setLeafMoves] = useState([]);
    const [winner, setWinner] = useState(null);
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    if (winner) {
        let obj = {
            id: generateId(8),
            winner,
        };

        console.log(obj);

        dispatch(addData(obj));
        console.log(data);
    }

    if ((leafMoves.length + pizzaMoves.length == 9) & (winner == null)) {
        setWinner("No winner");
        let obj = {
            id: generateId(8),
            winner: "No winner",
        };

        console.log(obj);
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

    function verifyWinner() {
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

        let hasLeafWon = null;
        let hasPizzaWon = null;

        for (let i = 0; i < arrayLeaf.length; i++) {
            for (let y = 0; y < arrayWins.length; y++) {
                if (arrayLeaf[i].toString() == arrayWins[y].toString()) {
                    hasLeafWon = true;
                }
            }
        }

        for (let i = 0; i < arrayPizza.length; i++) {
            for (let y = 0; y < arrayWins.length; y++) {
                if (arrayPizza[i].toString() == arrayWins[y].toString()) {
                    hasPizzaWon = true;
                }
            }
        }

        if (hasLeafWon) {
            setWinner("Leaf");
        }

        if (hasPizzaWon) {
            setWinner("Pizza");
        }

        console.log("verify");
    }

    return (
        <div className="App">
            <h1>Jogo da velha</h1>
            <h2>
                Vez de {userMove === "pizza" ? <IoMdPizza /> : <IoIosLeaf />}
            </h2>
            <h2>Ganhador: {winner != null ? winner : ""}</h2>
            <Container>
                {moves.map((item, index) => (
                    <SmallContainer
                        key={index}
                        onClick={(e) => handleMove(index)}
                    >
                        {moves[index] !== "" ? (
                            moves[index].userMove === "pizza" ? (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: [0.5, 1.2, 0.8, 1],
                                    }}
                                    transition={{
                                        duration: 0.4,
                                    }}
                                >
                                    <IoMdPizza className="iconGame" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: [0.5, 1.2, 0.8, 1],
                                    }}
                                    transition={{
                                        duration: 0.4,
                                    }}
                                >
                                    <IoIosLeaf className="iconGame" />
                                </motion.div>
                            )
                        ) : null}
                    </SmallContainer>
                ))}
            </Container>
        </div>
    );
}

export default App;
