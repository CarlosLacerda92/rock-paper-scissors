const getComputerChoice = () => {

    const num = Math.floor((Math.random() * 9));

    if (num >= 0 && num <= 2) {
        return "rock";
    }

    if (num >= 3 && num <= 5) {
        return "paper";
    }

    if (num >= 6 && num <= 8) {
        return "scissors";
    }

    return null;
}