export const sayHello = name => {
    if (!name) {
    return "Hello, World"
    }
    // J'ajoute ici cette ligne dans ma fonction
    if (name === "Alexandra") {
    return "Bonjour, Alexandra"
    }
    return `Hello, ${name}`
    }