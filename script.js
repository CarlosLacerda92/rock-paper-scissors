let round         = 0;
let ties          = 0;
let computerScore = 0;
let humanScore    = 0;

const roundSpan   = document.querySelector('span#round');
const winSpan     = document.querySelector('span#wins');
const lossSpan    = document.querySelector('span#losses');
const tieSpan     = document.querySelector('span#ties');
const messageSpan = document.querySelector('span#message');

const getComputerChoice = () => {
    const choices      = ["rock", "paper", "scissors"];
    const randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
};

const playRound = (computerChoice, humanChoice) => {

    if (!humanChoice) {
        return;
    }

    round++;
    roundSpan.textContent = round;

    if (computerChoice === humanChoice) {

        ties++;

        tieSpan.textContent = ties;
        messageSpan.textContent = `It's a tie! You chose ${humanChoice} and the computer chose ${computerChoice} as well!`;

        return;
    }

    let message       = ``;
    const bothChoices = computerChoice + humanChoice;

    if (['rockscissors', 'scissorspaper', 'paperrock'].includes(bothChoices)) {
        computerScore++;
        lossSpan.textContent = computerScore;
        message = `You lost! ${humanChoice} is beaten by ${computerChoice}!`;
    }
    else {
        humanScore++;
        winSpan.textContent = humanScore;
        message = `You won! ${humanChoice} beats ${computerChoice}!`;
    }

    messageSpan.textContent = message;
};

document.querySelectorAll('div#playableButtons button').forEach((element) => {
    element.addEventListener('click', () => {
        playRound(getComputerChoice(), element.id);
    });
});