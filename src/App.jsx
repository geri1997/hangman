import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data";
import JSConfetti from "js-confetti";
import Confetti from "react-confetti/";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [tries, setTries] = useState(0);
  const [usedWords, setUsedWords] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [showError, setShowError] = useState(false);

  const jsConfetti = new JSConfetti();

  function keyPressHandler(e) {
    //if the key length is 1 and
    //the key is an alphabet letter,
    //add the key to the used letters
    if (!gameOver) {
      if (usedLetters.includes(e.key)) {
        setShowError(true);

        setTimeout((e) => setShowError(false), 1000);
      }
      //this stops the user from pressing space,ctrl,alt,shift,numbers,etc
      if (
        e.key.length === 1 &&
        /[a-z]/.test(e.key.toLowerCase()) &&
        !usedLetters.includes(e.key)
      ) {
        setUsedLetters((prevLetters) => [...prevLetters, e.key]);
        if (!chosenWord.split("").includes(e.key)) {
          if(tries<5)setTries((prevTries) => prevTries + 1);
        }
      }
    }
  }

  function getRandomWord() {
    //pick a random word from words
    //find the length of the word
    let word = data[Math.floor(Math.random() * data.length)];
    for (let i = 0; i < data.length; i++) {
      if (usedWords.length === data.length) {
        return word;
      }
      if (!usedWords.includes(word)) {
        return word;
      } else {
        word = data[Math.floor(Math.random() * data.length)];
      }
    }
  }

  function gameLost() {
    if (tries === 5) return true;
    jsConfetti.addConfetti();
    return false;
  }

  function newGame() {
    setUsedWords((prevUsedWords) => {
      console.log("usedWords");
      return [...prevUsedWords, chosenWord];
    });

    setChosenWord((prevWord) => {
      console.log("chosenWord:");
      return getRandomWord();
    });
    setTries(0);
    setUsedLetters([]);
    setGameOver(false);
  }

  useEffect(() => {
    document.addEventListener("keyup", keyPressHandler);

    return () => {
      document.removeEventListener("keyup", keyPressHandler);
    };
  }, [usedLetters, chosenWord, usedLetters, tries,gameOver]);

  //set a random word when game starts
  useEffect(() => {
    setChosenWord(getRandomWord());
  }, []);

  function displayWord() {
    //make the word an array of letter
    if (chosenWord) {
      let splitWord = chosenWord.split("");
      //for every letter check if user has pressed that letter
      //if he has, display the letter
      //else display _
      const arrToDisplay = splitWord.map((letter, index) => {
        return (
          <span key={index}>
            {usedLetters.includes(letter) || gameOver ? letter : "_"}
          </span>
        );
      });
      return arrToDisplay;
    }
  }

  useEffect(() => {
    if (
      chosenWord !== "" &&
      chosenWord.split("").every((letter) => usedLetters.includes(letter))
    )
      setGameOver(true);

    tries === 5 && setGameOver(true);
  }, [chosenWord, tries, usedLetters]);

  return (
    <>
      <div className={`game ${showError ? "shaker" : ""}`}>
        <div className="word">{displayWord()}</div>
        {showError && <h4 className="error">Letter already pressed</h4>}
        <h4>
          Wrong guesses :{" "}
          {usedLetters.filter(
            (letter) => !chosenWord.split("").includes(letter)
          )}
        </h4>
        <h4>Number of tries: {tries} out of 5</h4>
        {gameOver && (
          <>
            <h2>{gameLost() ? "You Lost" : "You Won"}</h2>
            <button onClick={newGame}>New Game</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
