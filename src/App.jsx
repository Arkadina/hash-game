import { useState } from "react";
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

    function handleMove(pos) {
        if (moves[pos] === "") {
            let data = moves;
            data[pos] = {
                pos,
                userMove,
            };
            setMoves([...data]);
            userMove === "pizza" ? setUserMove("leaf") : setUserMove("pizza");
            handleSetIcon(pos);
            verifyMove();
        }

        console.log(moves);
    }

    function verifyMove() {}

    function handleSetIcon(pos) {
        moves[pos] !== "" ? (
            userMove === "pizza" ? (
                <IoMdPizza />
            ) : (
                <IoIosLeaf />
            )
        ) : null;
    }

    return (
        <div className="App">
            <h1>Jogo da velha</h1>
            <h1>
                Vez de {userMove === "pizza" ? <IoMdPizza /> : <IoIosLeaf />}
            </h1>
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
