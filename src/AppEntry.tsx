import React, { useEffect, useState } from 'react'
import App from './App.tsx'

const useCountdown = (targetDate: number, handleTimeup: () => void, disabled: boolean) => {
    const countDownDate = new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        if (disabled) {
          clearInterval(interval);
        }
        if (distance < 500) {
          handleTimeup();
          clearInterval(interval);
        }
        else {
          setCountDown(distance);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [countDownDate, disabled]);
  
    return getReturnValues(countDown);
  };
  
const getReturnValues = (countDown: number) => {
  const minutes = Math.floor((countDown / (1000 * 60)));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return [minutes, seconds];
};

export default function AppEntry() {
    
    const [targetDate, setTargetDate] = React.useState(new Date().getTime() + 1000 * 20)
    const resetTimer = () => {
        setTargetDate(new Date().getTime() + 1000 * 20)
        setIsTimeout(false)
        setDisabled(false)
        // console.log("resetTimer")
    }
    const [disabled, setDisabled] = React.useState(false)
    const disableTimer = () => {
        setDisabled(true)
    }

    const [isTimeout, setIsTimeout] = React.useState(false)
    const handleTimeup = () => {
        setIsTimeout(true)
    }
    const [minutes, seconds] = useCountdown(targetDate, handleTimeup, disabled);

    // console.log("isTimeout", isTimeout)
    return (
        <>
        <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                width: '120px',
                color: 'white',
                padding: '0.5rem',
                margin: '1rem',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: 'black',
                textAlign: 'center',
                position: 'absolute'
            }}
        >
            <span>{minutes<=0 && seconds<=0 ? "Time's up!" : `${minutes}m ${seconds}s`}</span>
        </div>
            <App isTimeout={isTimeout} resetTimer={resetTimer} disableTimer={disableTimer}/>
        </>
    )
}