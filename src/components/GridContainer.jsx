import React from "react";
import { IoMdPizza, IoIosLeaf } from "react-icons/io";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
    width: 550px;
    height: 550px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    background-color: #fff;
    border-radius: 8px;
`;

const SmallContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

function GridContainer({ moves, handleMove }) {
    return (
        <Container>
            {moves.map((item, index) => (
                <SmallContainer key={index} onClick={(e) => handleMove(index)}>
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
    );
}

export default GridContainer;
