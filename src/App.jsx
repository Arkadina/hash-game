import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { IoMdPizza, IoIosLeaf } from "react-icons/io";

const Container = styled.div`
    width: 600px;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    border: 2px solid #ccc;
    border-radius: 4px;
`;

const SmallContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ccc;
    cursor: pointer;
`;

function App() {
    const [userMove, setUserMove] = useState("pizza");
    const [moves, setMoves] = useState(["", "", "", "", "", "", "", "", ""]);
    const [pizzaMoves, setPizzaMoves] = useState([]);
    const [leafMoves, setLeafMoves] = useState([]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        verifyWinner();
    }, [pizzaMoves, leafMoves]);

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

        console.log(arrayPizza);

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

        console.log("Leaf:" + leafMoves);
        console.log("Pizza:" + pizzaMoves);
        console.log(moves);

        // console.log(arrayLeaf);
        // console.log(arrayPizza);

        for (let i = 0; i < arrayLeaf.length; i++) {
            for (let y = 0; y < arrayWins.length; y++) {
                if (arrayLeaf[i].toString() == arrayWins[y].toString()) {
                    hasLeafWon = true;
                }
            }
        }

        for (let i = 0; i < arrayLeaf.length; i++) {
            for (let y = 0; y < arrayWins.length; y++) {
                if (arrayPizza[i].toString() == arrayWins[y].toString()) {
                    hasPizzaWon = true;
                }
            }
        }

        // 0, 1, 2
        // 3, 4, 5
        // 6, 7, 8
        // 2, 5, 8
        // 1, 4, 7
        // 0, 3, 6
        // 0, 4, 8
        // 2, 4, 6
        if (hasLeafWon) {
            alert("Leaf ganhou");
            setWinner("Leaf");
        }

        if (hasPizzaWon) {
            alert("Pizza ganhou");
            setWinner("Pizza");
        }
    }

    return (
        <div className="App">
            <h1>Jogo da velha</h1>
            <h1>
                Vez de {userMove === "pizza" ? <IoMdPizza /> : <IoIosLeaf />}
            </h1>
            <h2>Ganhador: {winner != null ? winner : ""}</h2>
            <Container>
                {moves.map((item, index) => (
                    <SmallContainer
                        key={index}
                        onClick={(e) => handleMove(index)}
                    >
                        {moves[index] !== "" ? (
                            moves[index].userMove === "pizza" ? (
                                <IoMdPizza className="iconGame" />
                            ) : (
                                <IoIosLeaf className="iconGame" />
                            )
                        ) : null}
                    </SmallContainer>
                ))}
            </Container>
        </div>
    );
}

export default App;
