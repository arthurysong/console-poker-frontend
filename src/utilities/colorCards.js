export const colorCard = (card) => {
    // return "red"
    if (card[1] === "d" || card[1] === "h") {
        return "red"
    } else {
        return "black"
    }
}