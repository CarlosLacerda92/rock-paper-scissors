/* 
First logic.
It works, but it has unnecessary conditional checks.
*/
/* const getComputerChoice = () => {

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
} */

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