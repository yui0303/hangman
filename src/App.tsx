import { useEffect, useState } from "react"
import words from './wordlist.json'
import HangmanDrawing from './HangmanDrawing'
import HangmanWord from './HangmanWord'
import Keyboard from './Keyboard'

type AppProps = {
  isTimeout: boolean
  resetTimer: () => void
  disableTimer: () => void
}

function App({isTimeout, resetTimer, disableTimer}: AppProps) {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  const addGuessedLetter = (letter: string) => {
    if(guessedLetters.includes(letter)) return
    
    setGuessedLetters( currentLetters => [...currentLetters, letter])
  }

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))
  const isFinished = isLoser || isWinner || isTimeout

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if(!key.match(/^[a-z]$/) || isFinished ) return
      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener('keypress', handler)
    return () => {
      document.removeEventListener('keypress', handler)
    }
  })

  useEffect(() => {
    if(isLoser || isWinner) {
      disableTimer()
  }}, [isLoser, isWinner])
  

  return (
    <>
      <button onClick={() =>{
        setWordToGuess(words[Math.floor(Math.random() * words.length)])
        setGuessedLetters([])
        resetTimer()
      }} style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'black',
          padding: '0.5rem',
          margin: '1rem',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: 'lightblue',
          top: '80px',
          position: 'absolute'
      }}> New Game </button>
      <div 
        style={{
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          margin: '0 auto',
          alignItems: 'center'
        }}
      >
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {(isWinner) && 'You win!'}
        {(!isWinner && (isLoser || isTimeout)) && 'You lose!'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser || isTimeout} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <Keyboard 
        isDisabled={isFinished}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={guessedLetters.filter(letter => !wordToGuess.includes(letter))}
        addGuessedLetter={addGuessedLetter}
      />
      </div>
    </>
  )
}

export default App