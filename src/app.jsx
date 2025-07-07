import Die from "./assets/die"
import React, { useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use'

export default function App(){
  function randomArray(){
    return new Array(10).fill(0)
    .map(() => ({value:Math.ceil(Math.random() * 6 ),isheld:false,
      id:nanoid()
    }))
  }
  const buttonRef = useRef(null)
  const [dice,setdice] = React.useState(() => randomArray())
  const [shakestyle,setshakestyle] = React.useState({})
  function Shake(){
    setshakestyle({animation: 'shake 0.5s ease-in-out'})
    setTimeout(() => setshakestyle({}), 500)
  }
  let gamewon = false
  let winmessage = false
  if(dice.every(die => die.isheld) && dice.every(die => die.value === dice[0].value)){
    gamewon = true
    winmessage = true
  }
  React.useEffect(function(){
    buttonRef.current.focus()
  },[gamewon])
  function reRoll(){
    if(gamewon === false){

        const holdarray = []
        dice.map(diej => diej.isheld ? holdarray.push(diej.value) : diej )
        if (holdarray.every((item) => item === holdarray[0])){
          setdice(prevDice =>
            prevDice.map(die =>
              die.isheld ? die : { value: Math.ceil(Math.random() * 6), isheld: false, id: nanoid() }
            )
          )
        }else{
          console.log("not the same brother")
          setdice(() => randomArray())
          Shake()
        }
    }
    else{
      setdice(() => randomArray())
    }
  }
  

  function holder(id){
    setdice(preV => preV.map(die => die.id === id ? {...die,isheld:!die.isheld} : die))
  }
  const {width , height } = useWindowSize()


  return(
    <main>
      {gamewon && <Confetti width={width} height={height}/>}
            <div aria-live="polite" className="sr-only">
                {gamewon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
    <h1 className="title">Tenzies</h1>
    <p className="guide" style={shakestyle}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="content">
        {
          dice.map(each => {
            return(
              <Die key={each.id} value={each.value} isheld={each.isheld} onClick={() => holder(each.id)}/>
            )
          }) }
      <button className="roller" onClick={reRoll} ref={buttonRef}>{gamewon ? "New Game":"Roll"}</button>
      </div>
    </main>
  )




}