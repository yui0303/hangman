import styles from './Keyboard.module.css'

const KEYS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z"
]

type KeyboardProps = {
    isDisabled: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
}

function Keyboard({isDisabled=false, activeLetters, inactiveLetters, addGuessedLetter}: KeyboardProps) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))",
            gap: ".5rem",
            maxWidth: "1000px",
            width: "100%",
        }}>
            {KEYS.map((key) => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return (
                    <button onClick={() => addGuessedLetter(key)} 
                    className={`${styles.btn} ${isActive ? styles.active: ""} ${isInactive ? styles.inactive : ""}`} 
                    disabled={isActive || isInactive || isDisabled}
                    key={key}
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}

export default Keyboard