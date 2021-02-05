import { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css'

var secret = generateSecret();

function generateSecret() {
    let options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let secret = "";
    while(secret.length < 4) {
        let idx = Math.floor(Math.random() * options.length);
        secret += options[idx];
        options.splice(idx, 1);
    }
    return secret;
}

function GuessInput({guess, reset, enabled}) {
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
        if(event.key === "Enter" && text.length === 4){
            guess(text);
        }
    }

    return (
        <div className="field has-addons has-addons-centered">
            <div className="control">
                <input className="input"
                    type="text" 
                    placeholder="Guess"
                    onChange={updateText}
                    onKeyPress={onKeypress}
                    disabled={!enabled}
                    value={text}/>
            </div>
            <div className="control">
                <button className="button is-primary"
                        disabled={!enabled || text.length !== 4}
                        onClick={() => { guess(text); }}>
                    Guess 
                </button>
            </div>
            <div className="control">
                <button className="button is-danger"
                        onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
}


function App() {
    const [gameState, setGameState] = useState({
        secret: secret,
        guesses: [],
        results: [],
        correct: false,
    });

    function guess(text){
        if(text.length < 4) {
            return;
        }

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
            correct: correct === 4,
        })
    }

    function reset() {
        secret = generateSecret();
        setGameState({
            secret: secret,
            guesses: [],
            results: [],
            correct: false,
        })
    }
    let notificationClassName = "notification";
    if(gameState.correct) {
        notificationClassName += " is-primary";
    } else if(gameState.guesses.length >= 8){
        notificationClassName += " is-danger";
    } else {
        notificationClassName += " is-hidden";
    }

    return (
        <div className="App">
           <section className="section has-background-grey-light">
               <div className="container has-text-centered">
                    <div className={notificationClassName}>
                        <p>{gameState.correct ? "You Won!" : "You Lost!"}</p>
                        <p> Correct Answer: {gameState.secret}</p>
                    </div>
                   <GuessInput guess={guess}
                       reset={reset}
                       enabled={!gameState.correct && gameState.guesses.length < 8}/>
                    <p className="is-size-3">Lives: {8 - gameState.guesses.length}</p>
               </div>
           </section>
           <section className="section">
               <div className="container has-text-centered">
                   <h1 className="title is-size-2">Guesses:</h1>
                       <ul>
                           {gameState.guesses.map(function(e, i){
                               return (
                                   <li key={e}>
                                       <p>{e}: {gameState.results[i]}</p>
                                   </li>
                               );
                           })}
                       </ul>
               </div>
           </section>
        </div>
    );
}

export default App;
