import { useState } from "react";
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
  const [usedLetters, setUsedLetters] = useState([])

  //pick a random word from words
  //find the length of the word
  function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
  }
  
  
  //for every letter display a _
  function displayWord(word){
    //make the word an array
    let splitWord = word.split('')
    
    const arrToDisplay= splitWord.map(letter=>{
      if(usedLetters.includes(letter)){
        return <span>{letter}</span>
      }
      return <span>_</span>

    })
    return arrToDisplay
  }
  //add eventlistener to the document for every key input
  //if the key pressed is contained in the word, replace _ with the key


  return <>
  {displayWord(getRandomWord())}
  </>;
}

export default App;
