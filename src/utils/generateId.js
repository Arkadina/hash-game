export function generateId(length) {
    const numbers = "0123456789";
    let generated = "";

    for (let i = length; i > 0; i--) {
        let random = Math.random() * numbers.length + 1;
        generated += numbers.charAt(random);
    }

    return generated;
}
