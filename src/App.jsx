import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data";

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [tries, setTries] = useState(0);
  const [usedWords, setUsedWords] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  function keyPressHandler(e) {
    //if the key length is 1 and
    //the key is an alphabet letter,
    //add the key to the used letters
    console.log("handler split word: " + chosenWord.split(""));
    chosenWord !== "" &&
      chosenWord.split("").every((letter) => usedLetters.includes(letter)) &&
      setGameOver(true);

    tries === 4 && setGameOver(true);
    //this stops the user from pressing space,ctrl,alt,shift,numbers,etc
    if (
      !gameOver &&
      e.key.length === 1 &&
      /[a-z]/.test(e.key.toLowerCase()) &&
      !usedLetters.includes(e.key)
    ) {
      // console.log(usedLetters); //this logs empty array
      setUsedLetters((prevLetters) => [...prevLetters, e.key]);
      if (!chosenWord.split("").includes(e.key)) {
        setTries((prevTries) => prevTries + 1); // this code never runs
      }
    } else {
      console.log("nothing");
    }
  }

  function getRandomWord() {
    //pick a random word from words
    //find the length of the word
    return data[Math.floor(Math.random() * data.length)];
  }

  function gameLost() {
    if (tries === 5) return true;
  }
  // useEffect(() => {
  //   console.log("started check if lost");
  //   chosenWord !== "" &&
  //     chosenWord.split("").every((letter) => usedLetters.includes(letter)) &&
  //     setGameOver(true);

  //   tries === 5 && setGameOver(true);
  //   console.log("ended check if lost");
  // }, [usedLetters, tries]);

  function newGame() {
    setTries(0);
    setUsedWords((prevUsedWords) => [...prevUsedWords, chosenWord]);
    setUsedLetters([]);
    setGameOver(false);
    setChosenWord(getRandomWord());
  }

  useEffect(() => {
    // console.log("started add event listener");
    document.addEventListener("keyup", keyPressHandler);

    return () => {
      document.removeEventListener("keyup", keyPressHandler);
      // console.log("ended add event listener");
    };
  }, [usedLetters, chosenWord, usedLetters, tries]);

  //set a random word when game starts
  useEffect(() => {
    // console.log("started set random word");
    setChosenWord(getRandomWord());
    // console.log("ended set random word");
  }, []);

  function displayWord() {
    //make the word an array of letter
    let splitWord = chosenWord.split("");
    //for every letter check if user has pressed that letter
    //if he has, display the letter
    //else display _
    console.log("displayword function split word:  " + splitWord);
    const arrToDisplay = splitWord.map((letter, index) => {
      return (
        <span key={index}>{usedLetters.includes(letter) ? letter : "_"}</span>
      );
    });
    return arrToDisplay;
  }
  //add eventlistener to the document for every key input
  //if the key pressed is contained in the word, replace _ with the key

  return (
    <>
      {displayWord()}
      <h4>
        Wrong guesses :{" "}
        {usedLetters.filter((letter) => !chosenWord.split("").includes(letter))}
      </h4>
      <h4>Number of tries: {tries} out of 5</h4>
      {gameOver && (
        <>
          <h2>{gameLost ? "You Lost" : "You Won"}</h2>
          <button onClick={newGame}>New Game</button>
        </>
      )}
    </>
  );
}

export default App;
