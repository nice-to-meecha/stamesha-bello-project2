import React, { useEffect, useState, useContext } from "react";
import { gameContext } from "./GameContext";
import Guess from "./Row";

function Board(props) {
    const { attempts, difficulty, wordLength } = props;
    const globalValues = useContext(gameContext);
    const { numGuesses } = globalValues.difficultyValues[difficulty];
    const [guessInputs, setGuessInputs] = useState([]);

    useEffect(() => {
        console.log("Attempt changed");
        if (guessInputs.length < attempts + 1 && attempts < numGuesses) {
            console.log("Attempts < Guesses");
            setGuessInputs([
                ...guessInputs.slice(0, -1),
                ...(guessInputs.slice(-1).length
                    ? [React.cloneElement(...guessInputs.slice(-1), { active: false })]
                    : []
                ),
                (<Guess
                    active={true}
                    wordLength={wordLength}
                    key={attempts}
                />),
            ]);
        } else if (attempts === numGuesses) {
            console.log("Attempts === Guesses");
            setGuessInputs([
                ...guessInputs.map(guess => React.cloneElement(guess), { active: false })
            ]);

            console.log([
                ...guessInputs.map(guess => React.cloneElement(guess), { active: false })
            ]);
        }
    }, [attempts])

    return(<div>
        {guessInputs}
    </div>)
}

export default Board;