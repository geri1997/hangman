import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([
    "jackpot",
    "jaundice",
    "jawbreaker",
    "jaywalk",
    "jazziest",
    "jazzy",
    "jelly",
    "jigsaw",
    "jinx",
  ]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [chosenWord, setChosenWord] = useState("");
  const [hasWon, setHasWon] = useState(false);

  function getRandomWord() {
    //pick a random word from words
    //find the length of the word
    return words[Math.floor(Math.random() * words.length)];
  }

  useEffect(() => {
    
    chosenWord!==''&&chosenWord.split("").every((letter) => usedLetters.includes(letter)) &&
      setHasWon(true);
  }, [usedLetters]);

  function keyPressHandler(e) {
    //what happens when you press a key
    //if the key length is 1 and
    //the key is an alphabet letter
    //add the key to the used letters

    //this stops the user from pressing space,ctrl,alt,shift,numbers,etc

    e.key.length === 1 &&
      /[a-z]/.test(e.key) &&
      setUsedLetters((prevLetters) => [...prevLetters, e.key]);
  }

  useEffect(() => {
    document.addEventListener("keyup", keyPressHandler);

    return () => {
      document.removeEventListener("keyup", keyPressHandler);
    };
  }, [hasWon]);

  //set a random word when game starts
  useEffect(() => setChosenWord(getRandomWord()), []);

  function displayWord() {
    //make the word an array of letter
    let splitWord = chosenWord.split("");
    //for every letter check if user has pressed that letter
    //if he has, display the letter
    //else display _
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
      {hasWon && <h2>You Won</h2>}
    </>
  );
}

export default App;
