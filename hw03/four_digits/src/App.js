import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function GuessInput({guess}) {
    const [text, setText] = useState("");

    function updateText(event) {
        let checked = "";
        for (let c of event.target.value) {
            if (checked.length < 4 && !checked.includes(c)
                && c >= '0' && c <= '9') {
                checked += c;
            }
        }
        setText(checked);
    }

    function onKeypress(event) {
        if(event.key === "Enter"){
            guess(text);
        }
    }

    return (
        <p>
            <input type="text" 
                onChange={updateText}
                onKeyPress={onKeypress}
                value={text} />
                <button onClick={() => { guess(text); }}> Guess </button>
        </p>
    );

}

function generateSecret() {
    return "1234";
}

function App() {
    const [gameState, setGameState] = useState({
        secret: generateSecret(),
        guesses: [],
        results: [],
        over: false,
    });

    function guess(text){
        console.log(gameState.secret);
        console.log(text);

        let key = gameState.secret;
        let correct = 0;
        let misplaced = 0;

        for (let i = 0; i < key.length; i++) {
            if (text[i] === key[i]) {
                correct += 1;
            } else if(key.includes(text[i])) {
                misplaced += 1;
            }
        }
        let result = correct.toString() + "A" + misplaced.toString() + "B";

        // set up new state
        gameState.guesses.push(text);
        gameState.results.push(result);

        setGameState({
            secret: gameState.secret,
            guesses: gameState.guesses,
            results: gameState.results,
            over: correct === 4,
        })
    }

    function getDisplay(guesses, results) {
        let display = "";
        for(let i = 0; i < guesses.length; i++) {
            display += guesses[i];
            display += ": ";
            display += results[i];
            display += "\n";
        }
        return display;
    }

    function reset() {
        setGameState({
            secret: generateSecret(),
            guesses: [],
            results: [],
            over: false,
        })
    }
    let body = null;
    let resetButton = (
       <button onClick={reset}>Reset</button>
    );

    if(!gameState.over) {
       body = (
           <div>
               <GuessInput guess={guess}/>
               {resetButton}
               <h1> Guesses </h1>
               <p> {getDisplay(gameState.guesses, gameState.results)} </p>
           </div>
      );
    } else {
        body = (
            <div>
                <h1>Game Over</h1>
               {resetButton}
            </div>
        );
    }
    return (
        <div className="App">
            {body}
        </div>
    );
}

export default App;
