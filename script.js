
//  Optimized and cleaner function
const getComputerChoice = () => {

    const choices      = ["rock", "paper", "scissors"];                 //  I actually thought using an array would be a better option for this case.
    const randomNumber = Math.floor(Math.random() * choices.length);    //  But I didn't think I could generate a random number
    return choices[randomNumber];                                       //  and use it as an index to return the corresponding item from the choices array.
};

const getHumanChoice = () => {

    let choice           = '';
    const allowedChoices = ["rock", "paper", "scissors"];
    let keepGoing        = true;

    while (keepGoing) {

        choice = prompt('Rock, Paper, or Scissors?');

        if (choice === null) {
            keepGoing = false;
        }
        else {
            choice = choice.toLowerCase();

            if (allowedChoices.includes(choice)) {
                keepGoing = false;
            }
        }
    }

    return choice;
};

/* playRound(getComputerChoice(), getHumanChoice()); */

const playGame = () => {

    let computerScore = 0;
    let humanScore    = 0;
    let ties          = 0;
    let finalMessage  = ``;

    const playRound = (computerChoice, humanChoice) => {

        if (!humanChoice) {
            return;
        }
    
        if (computerChoice === humanChoice) {
            ties++;
            console.log(`It's a tie! You chose ${humanChoice} and the computer chose ${computerChoice} as well!\nYour score: ${humanScore}\nComputer score: ${computerScore}\nTies: ${ties}`);
            return;
        }
    
        let result        = 1;
        let message       = ``;
        const bothChoices = computerChoice + humanChoice;
    
        if (['rockscissors', 'scissorspaper', 'paperrock'].includes(bothChoices)) {
            result  = 0;
            computerScore++;
            message = `You lost! ${computerChoice} beats ${humanChoice}!\nYour score: ${humanScore}\nComputer score: ${computerScore}\nTies: ${ties}`;
        }
        else {
            humanScore++;
            message = `You won! ${humanChoice} beats ${computerChoice}!\nYour score: ${humanScore}\nComputer score: ${computerScore}\nTies: ${ties}`;
        }
    
        console.log(message);
    };

    for (let i = 1; i <= 5; i++) {
        console.log(`Round ${i} of 5!`)
        playRound(getComputerChoice(), getHumanChoice());
    }

    finalMessage = `Game Over!\nFinal scores:\nYou: ${humanScore}\nComputer: ${computerScore}`;

    if (humanScore < computerScore) {
        finalMessage += `\nYou lost! Try again.`;
    }
    else if (humanScore > computerScore) {
        finalMessage += `\nYou won! Congratulations!`;
    }
    else {
        finalMessage += `\nIt's a tie!`;
    }

    console.log(finalMessage);
};

playGame();