import React from "react"

const HEAD = (
    <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            border: "10px solid black",
            top: "50px",
            right: "-30px",
            position: "absolute"
        }}
    >
    </div>
)

const BODY = (
    <div style={{
            height: "100px",
            width: "10px",
            background: "black",
            top: "120px",
            right: "0",
            position: "absolute"
        }}
    >
    </div>
)

const ARM_LEFT = (
    <div style={{
            height: "10px",
            width: "100px",
            background: "black",
            top: "150px",
            right: "10px",
            position: "absolute",
            rotate: "30deg",
            transformOrigin: "bottom right"
        }}
    >
    </div>
)

const ARM_RIGHT = (
    <div style={{
            height: "10px",
            width: "100px",
            background: "black",
            top: "150px",
            right: "-100px",
            position: "absolute",
            rotate: "-30deg",
            transformOrigin: "bottom left"
        }}
    >
    </div>
)

const LEG_LEFT = (
    <div style={{
            height: "10px",
            width: "100px",
            background: "black",
            top: "210px",
            right: "0",
            position: "absolute",
            rotate: "-30deg",
            transformOrigin: "bottom right"
        }}
    >
    </div>
)

const LEG_RIGHT = (
    <div style={{
            height: "10px",
            width: "100px",
            background: "black",
            top: "210px",
            right: "-90px",
            position: "absolute",
            rotate: "30deg",
            transformOrigin: "bottom left"
        }}
    >
    </div>
)

type HangmanDrawingProps = {
    numberOfGuesses: number
}

const BODY_PARTS = [ HEAD, BODY, ARM_LEFT, ARM_RIGHT, LEG_LEFT, LEG_RIGHT ]


function HangmanDrawing( {numberOfGuesses}: HangmanDrawingProps ) {
    return (
        <div style={{position: "relative"}}>
            <div style={{height: "50px", width: "10px", background: "black", top: "0", right: "0", position: "absolute"}}></div>
            {BODY_PARTS.slice(0, numberOfGuesses).map((part, index) => {
                return (<React.Fragment key={index}>
                    {part}
                </React.Fragment>)
            })}
            <div style={{height: "10px", width: "160px", background: "black", marginLeft: "80px"}}></div>
            <div style={{height: "400px", width: "10px", background: "black", marginLeft: "80px"}}></div>
            <div style={{height: "10px", width: "250px", background: "black"}}></div>
        </div>
    )
}

export default HangmanDrawing