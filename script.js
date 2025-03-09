let computerScore = 0;
let humanScore    = 0;

//  Optimized and cleaner function
const getComputerChoice = () => {

    const choices      = ["rock", "paper", "scissors"];                 //  I actually thought using an array would be a better option for this case.
    const randomNumber = Math.floor(Math.random() * choices.length);    //  But I didn't think I could generate a random number
    return choices[randomNumber];                                       //  and use it as an index to return the corresponding item from the choices array.
}

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
}

const playRound = (computerChoice, humanChoice) => {

    if (!humanChoice) {
        return;
    }

    if (computerChoice === humanChoice) {
        console.log(`It's a tie! You chose ${humanChoice} and the computer chose ${computerChoice} as well!`);
        return;
    }

    let result        = 1;
    let message       = `You won! ${humanChoice} beats ${computerChoice}!`;
    const bothChoices = computerChoice + humanChoice;

    if (['rockscissors', 'scissorspaper', 'paperrock'].includes(bothChoices)) {
        result  = 0;
        message = `You lost! ${computerChoice} beats ${humanChoice}!`;
        computerScore++;
    }
    else {
        humanScore++;
    }

    console.log(message);
}

playRound(getComputerChoice(), getHumanChoice());