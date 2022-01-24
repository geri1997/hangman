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

  function keyPressHandler(e) {
    //what happens when you press a key
    //add the key to the used letters

    e.key.length === 1 &&
      /[a-zA-Z]/.test(e.key) &&
      setUsedLetters(prevLetters=>[...prevLetters, e.key]);
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

  return <>{displayWord()}</>;
}

export default App;
