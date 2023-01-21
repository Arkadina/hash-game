export function generateMove() {
    const moves = ["pizza", "leaf"];

    const generate = Math.floor(Math.random() * moves.length);
    return moves[generate];
}
