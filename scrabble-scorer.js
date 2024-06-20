// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


let playerInput = "";
let finalWord = "";
// let playersChoice = 0;

//use function to score word provided by the user

function oldScrabbleScorer(word) {
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letter = word[i];
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}`
            console.log(`Points for '${word[i]}': ${pointValue}\n`);
         }
      }
   }
   return letterPoints;
}
// console.log(oldScrabbleScorer(word));
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
//return a numerical score
//each letter within word = 1pt
function simpleScorer(word) {
   let scorePoints = 0;
   for (i = 0; i < word.length; i++) {
      scorePoints++;
      finalWord += word[i];
   }
   console.log(`Your score for ${finalWord} is ${scorePoints}pts.`);
   return scorePoints
}


function vowelBonusScorer(word) {
   let bonusScorePoints = 0;
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let vowelPoints = 3;
   for (let x = 0; x < word.length; x++) {
      let gotVowelBonus = false;
      for (let j = 0; j < vowels.length; j++) {
         if (word[x].toUpperCase() === vowels[j]) {
            bonusScorePoints += vowelPoints; 
            gotVowelBonus = true;
          } 
      } 
      if (!gotVowelBonus){
         bonusScorePoints++;
      }
   }
   console.log(`Your score for ${finalWord} is ${bonusScorePoints}pts.`);
      return bonusScorePoints;
}
// console.log("vowelBonusScorer");
//    console.log(vowelBonusScorer(word));
   
function initialPrompt() {
   console.log("Let's play some scrabble!");
  playerInput = input.question("Enter a word to score: ");
  let playersChoice = input.question(`Choose your scoring option: 
   0 - ${simpleScorer.name}: ${simpleScorer.description}
   1 - ${vowelBonusScorer.name}: ${vowelBonusScorer.description}
   2 - ${scrabbleScorer.name}: ${scrabbleScorer.description}
   Enter 0, 1, or 2: `);
 
   
   return [playerInput, playersChoice]
  
}

let simpleScorerOne = {
   name: 'Simple Score',
   description: 'One point per character',
   scorerFunction: simpleScorer
};
let vowelBonusScorerOne = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts',
   scorerFunction: vowelBonusScorer
}
let scrabbleScorerOne = {
   name: 'Scrabble',
   description: 'Uses scrabble point system',
   scorerFunction: scrabbleScorer
};
let returnObject = [];
const scoringAlgorithms = [simpleScorerOne, vowelBonusScorerOne, scrabbleScorerOne];

function scorerPrompt(_playerInput, playersChoice) {
   let splitPlayerInput = _playerInput.toUpperCase().split('');
console.log("player input: " + _playerInput + "  player's choice: " + playersChoice);
      if (playersChoice == 0) {
         console.log(`Score for '${_playerInput}': ${simpleScorerOne.scorerFunction(splitPlayerInput)}`);
      }
      if (playersChoice == 1) {
         console.log(`Score for '${_playerInput}': ${vowelBonusScorerOne.scorerFunction(splitPlayerInput)}`);
      }
      if (playersChoice == 2) {
         console.log(`Score for '${_playerInput}': ${scrabbleScorerOne.scorerFunction(splitPlayerInput)}`);
      }
}

let newPointStructure = transform(oldPointStructure);

// let simpleScorer;

// let vowelBonusScorer;j  

// let scrabbleScorer;
function scrabbleScorer(word){
   let wordScore = 0;
   for (let i = 0; i < word.length; i++) {
     let letter = word[i];
     letter = letter.toLowerCase();
   //   console.log(letter);
   //   console.log(newPointStructure[letter]);
     wordScore += Number(newPointStructure[letter]);
   }
   return wordScore;
}

//bracket notation to access the point value for the key
//for in loop with two index
//first index is the letter, second is the point value
//for loop to iterate through for points, another inside to iterate through the letters
//set new key/value pair for each letter and point
//iterate through the array
//methods to loop through the index, loop only once
//

function transform(oldPointStructure) {
   let pointStructure2 = {};
   for (const pointValue in oldPointStructure) {
     let letters = oldPointStructure[pointValue];
     for(const index in letters){
      let key = letters[index].toLowerCase();
      // console.log(`${pointValue}`);
      // console.log(`${letters[index]}`);
      pointStructure2[`${key}`] = Number(pointValue);
     }
}
return pointStructure2;
}


function runProgram() {
   let derp = [];
   derp = initialPrompt();
   // // console.log(typeof(derp));
   // // for (let i = 0; i < derp.length; i++){
   // //    console.log(derp[i]);
   // // }
   // oldScrabbleScorer(playerInput);
   // simpleScorer(playerInput);
   // vowelBonusScorer(playerInput);
   scorerPrompt(derp[0], derp[1]);
   // for(const keys in newPointStructure){
   //    console.log(typeof keys);
   //    console.log(keys +"-" + newPointStructure[keys]);
   // }
   // scrabbleScorer("Word");
   // console.log(scrabbleScorer("Blabb"));
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
