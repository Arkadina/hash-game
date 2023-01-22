import React from "react";
import { IoMdPizza, IoIosLeaf } from "react-icons/io";

function InfoContainer({ userMove, winner }) {
    return (
        <div className="info-container">
            <div className="items-container">
                Turn: {userMove === "pizza" ? <IoMdPizza /> : <IoIosLeaf />}
            </div>

            <div className="items-container">
                Last winner: {winner != null ? winner : "No winner"}
            </div>

            <div className="items-container">Reset game</div>
        </div>
    );
}

export default InfoContainer;
