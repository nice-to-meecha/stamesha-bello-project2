import React, { useState, useEffect } from 'react';
import normalWords from "../data/normal_words.txt";
import hardWords from "../data/hard_words.txt";
import "../css/Game.css";

/*

    On the game page, users should have a prompt to input a word that is the
    length defined by the difficulty level.
    
    If the user inputs the correct word, you should display a congratulations
    at the top of the screen. If they chose an incorrect word, you will give
    them clues based on the location of the letters in the word by highlighting
    certain letters.

        Green: letters is in the correct spot
        Yellow: letter is present in the secret word but is in the incorrect
                place
        Gray: letter is not in the word

    If the word is too short or long, you should show a message at the top but
    will not deduct any attempts.
    
    Here is an example flow: 
        1. Game secretly selects the word “Fellow”.  The screen prompts the
           user to input a 6 letter word and shows that they have 6 attempts
           remaining.
        2. User submits the word “hat.”
        3. Since “hat” is too short, the game prompts a longer word and does
           not deduct any attempts.
        4. The user submits in “Allows”.
        5. The game shows “ALLOWS” and since this is not the current word it
           shows the user has 1 less attempt.
        6. The user submits “Fellow”.
        7. The game shows “Congratulations!  Would you like to try again?
*/

const difficultyValues = {
    normal: {
        numGuesses: 6,
        wordLength: 6,
        wordList: normalWords,
    },

    hard: {
        numGuesses: 5,
        wordLength: 7,
        wordList: hardWords,
    },
};

function Game(props) {
    const { difficulty } = props;
    console.log(difficulty);
    const { numGuesses, wordList, wordLength } = difficultyValues[difficulty];

    const [ word, setWord ] = useState("");
    const [ board, setBoard ] = useState([]);
    const [ attempts, setAttempts ] = useState(0);
    const [ currGuess, setCurrGuess ] = useState("");
    
    useEffect(() => {
        async function selectWord() {
            fetch(wordList)
                .then(response => response.text())
                .then(data => {
                    const words = data.split("\n").map(word => word.trim());
                    const i = Math.round(Math.random() * (words.length - 1));
                    console.log(words);
                    setWord(words[i]);
                });
        }

        selectWord();
    }, [])
    
    useEffect(() => {
        function createBoard() {
            const wordGuesses = [];
            for (let i = 0; i < numGuesses; i++) {
                wordGuesses.push((<div key={i}>
                    <input
                        id={`guess${i + 1}`}
                        disabled={attempts !== i}
                        onChange={updateCurrGuess} />
                </div>));
            }
        
            setBoard(wordGuesses);
            console.log(board);
        }
    
        createBoard();
    }, [attempts])

    function checkAttempt() {
        if (attempts < numGuesses) {
            if (!validAttempt()) {
                return;
            }
            const currentGuess = board[attempts];
            console.log(currentGuess);
            setAttempts(attempts + 1);
        }
    }

    function updateCurrGuess(event) {
        setCurrGuess(event.target.value);
    }

    function validAttempt() {
        if (currGuess.length !== wordLength) {
            alert(`Try a ${currGuess.length < wordLength ? "longer" : "shorter"} word!`);
            return false;
        }

        return true;
    }
     
    return (<div>
        <h1>This is the {difficulty} game page!</h1>
        <div>Please select a {wordLength}-letter word:</div>
        <h4>The word is {word}</h4>
        <div>Remaining attempts: {numGuesses - attempts}</div>
        {board}
        <button
            onClick={checkAttempt}
            disabled={numGuesses <= attempts}
        >
            Submit
        </button>
        </div>);
}

export default Game;