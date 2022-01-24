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

  //pick a random word from words
  //find the length of the word
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  //set a random word when game starts
  useEffect(() => setChosenWord(getRandomWord()), []);

  //for every letter display a _
  function displayWord() {
    //make the word an array of letter
    let splitWord = chosenWord.split("");
    //for every letter check if user has pressed that letter
    //if he has, display the letter
    //else display _
    const arrToDisplay = splitWord.map((letter) => {
      if(usedLetters.includes(letter)){
      return <span>{letter}</span>;
      }
      return <span>_</span>;
    });
    return arrToDisplay;
  }
  //add eventlistener to the document for every key input
  //if the key pressed is contained in the word, replace _ with the key

  return (
    <>
      {displayWord()}
    </>
  );
}

export default App;
